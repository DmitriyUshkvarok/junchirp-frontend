import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

// Типизация координат
interface Location {
  lat: number;
  lng: number;
}

interface LocationState {
  location: Location | null;
}

const initialState: LocationState = {
  location: null,
};

// Конфигурация для persist с использованием sessionStorage
const locationPersistConfig = {
  key: 'location',
  storage: storageSession, // sessionStorage
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    clearLocation: (state) => {
      state.location = null;
    },
  },
});

// Экспортируем экшены
export const { setLocation, clearLocation } = locationSlice.actions;

// Селектор для получения текущей локации
export const selectLocation = (state: { location: LocationState }) =>
  state.location.location;

const persisteLocationReducer = persistReducer(
  locationPersistConfig,
  locationSlice.reducer
);
// Экспорт редюсера
export default persisteLocationReducer;
