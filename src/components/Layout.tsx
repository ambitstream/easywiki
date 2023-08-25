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
                    <img className="app-logo" src={logo} alt="Logo" />
                    <div className="help-icon">?</div>
                    <div className="help-bubble">
                        In the modern information-oversaturated world, there isn't always the opportunity or time to study a particular Wikipedia article. Easywiki solves this problem. Choose the article of interest, and artificial intelligence will summarize it for you in a few sentences.
                    </div>
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