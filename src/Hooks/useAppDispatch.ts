// This code creates a typed version of useDispatch for your Redux store.
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';


const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
