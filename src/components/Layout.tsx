import { PropsWithChildren } from 'react'
import logo from '../images/logo.png';

type LayoutProps = {
  loading: false
}

const Layout = (props: PropsWithChildren<LayoutProps>) => {
    return (
        <div className="App">
            <header className="app-header">
                <img width={120} className="app-logo" src={logo} alt="Logo" />
            </header>
            <div className="body">
                {props.children}
            </div>
        </div>
    );
};

export default Layout;