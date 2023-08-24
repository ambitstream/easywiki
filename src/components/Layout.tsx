import { PropsWithChildren } from 'react'
import logo from '../images/logo.png';

type LayoutProps = {
  loading: boolean
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
    return (
        <div className="outer-wrapper">
            <div className="inner-wrapper">
                <header className="app-header">
                    <img width={120} className="app-logo" src={logo} alt="Logo" />
                </header>
                {props.children}
                </div>
            {props.loading ?
                <div className="loading"></div>
            : ''}
        </div>
    );
};

export default Layout;