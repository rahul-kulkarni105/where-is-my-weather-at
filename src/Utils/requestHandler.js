import axios from 'axios'
import {
  COMMON_HEADERS
} from '../Utils/globalConstants'

export const requestHandler = ({
  // Can override axios instance variables from an individual action
  // by passing them as params here
  baseURL = '',
  customHeaders = {}
}) => axios.create({
  baseURL,
  headers: { ...COMMON_HEADERS, ...customHeaders }
});