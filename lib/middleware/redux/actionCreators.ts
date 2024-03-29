
import { Action } from 'redux';

import {
  NAVIGATE,
  NAVIGATE_FAILURE,
  NAVIGATE_SUCCESS,
  START_NAVIGATION,
} from './constants';

// Types
import {
  INavigateAction,
  INavigateFailureAction,
  INavigateSuccessAction,
  RouteObject,
  OptionsType,
} from '@typings/next-redux-routing';

export const navigate = (href: string, options?: OptionsType): INavigateAction => ({
  type: NAVIGATE,
  href,
  options,
});

export const navigateFailure = (error: Error): INavigateFailureAction => ({
  type: NAVIGATE_FAILURE,
  error,
})

export const navigateSuccess = (route: RouteObject): INavigateSuccessAction => ({
  type: NAVIGATE_SUCCESS,
  route,
})

export const startNavigation = (): Action => ({
  type: START_NAVIGATION,
});
