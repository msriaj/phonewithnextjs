import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>My App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Navbar />
            <main>{children}</main>
            <footer>
                <p>My App &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};
export default Layout;