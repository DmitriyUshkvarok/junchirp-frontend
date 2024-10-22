'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hook';
import { setLocation, selectLocation } from '@/redux/locationSlice';

// Типизация координат
interface Location {
  lat: number;
  lng: number;
}

const ModalWithMap = () => {
  const dispatch = useAppDispatch();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'], // добавляем библиотеку places для автокомплита
  });

  // Типизируем стейт для выбранной локации
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  // Типизируем стейт для автокомплита
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [defaultLocation, setDefaultLocation] = useState<Location>({
    // lat: 40.7128, // Нью-Йорк по умолчанию
    // lng: -74.006,
    lat: 50.4501, // Киев по умолчанию
    lng: 30.5234,
  });
  // const [defaultLocation, setDefaultLocation] = useState<Location>({
  //   lat: 50.4501, // Киев по умолчанию
  //   lng: 30.5234,
  // });

  const locationFromRedux = useAppSelector(selectLocation); // Используем селектор
  console.log('Текущее местоположение из Redux:', locationFromRedux); // Логируем значение

  // Типизируем ссылку на карту
  const mapRef = useRef<GoogleMap | null>(null);

  // Запрашиваем геолокацию пользователя при монтировании компонента
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setDefaultLocation(currentLocation); // Устанавливаем текущую геолокацию как начальную точку
          setSelectedLocation(currentLocation); // Ставим маркер на текущую геолокацию
        },
        (error) => {
          console.error('Ошибка при получении геолокации: ', error);
        }
      );
    }
  }, []);

  // Обработчик клика на карту с типизацией события
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setSelectedLocation({ lat, lng });
        dispatch(setLocation({ lat, lng })); // Сохраняем в Redux
      }
    },
    [dispatch]
  );

  const handleAutocompleteLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

  // Обработчик изменения местоположения в автокомплите
  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        dispatch(setLocation(location));
        if (mapRef.current) {
          mapRef.current.panTo(location); // Перемещаем карту к новому месту
        }
      }
    }
  };

  // Обработчик кнопки подтверждения
  const handleConfirmClick = () => {
    if (selectedLocation) {
      console.log('Выбранные координаты:', selectedLocation);
    } else {
      console.log('Координаты не выбраны');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Выберите место на карте или введите адрес</h2>

        {/* Поле автокомплита для поиска адреса с фильтрацией по городам */}
        <Autocomplete
          onLoad={handleAutocompleteLoad}
          onPlaceChanged={handlePlaceChanged}
          options={{
            types: ['(cities)'], // Фильтруем по городам
          }}
        >
          <input
            type="text"
            placeholder="Введите адрес"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '100%',
              height: '40px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '16px',
              outline: 'none',
              textOverflow: 'ellipses',
            }}
          />
        </Autocomplete>

        {/* Карта */}
        <GoogleMap
          ref={mapRef}
          onClick={handleMapClick}
          center={selectedLocation || defaultLocation} // начальные координаты
          zoom={12}
          mapContainerStyle={{ width: '100%', height: '400px' }}
        >
          {/* Маркер на выбранной или текущей геолокации */}
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>

        <button onClick={handleConfirmClick}>Подтвердить</button>
        <button>Закрыть</button>
      </div>
    </div>
  );
};

export default ModalWithMap;
