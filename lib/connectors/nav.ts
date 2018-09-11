
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { navigate } from '../middleware/redux/actionCreators';

import { OptionsType } from '@typings/next-redux-routing';

type DispatchProps = {
  navigate: (href: string, options: OptionsType) => void;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  navigate,
}, dispatch);

export default function useNav(Component: React.ComponentClass<any, any>) {
  return connect<{}, DispatchProps>(null, mapDispatchToProps)(Component) as any;
}
