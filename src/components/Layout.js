import { APP_NAME } from '@/config';
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
            <main className='bg-gray-50'>
                <div className='max-w-7xl mx-auto'>

                    {children}
                </div>

            </main>
            <footer className="bg-gray-800 py-2 text-center text-white">
                <p> {APP_NAME} &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
};
export default Layout;