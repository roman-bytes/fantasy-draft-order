import { Link } from 'gatsby';
import React from 'react';
import { FunctionComponent } from 'react';
import { ReactElement } from 'react';

interface HeaderProps {
    siteTitle: string;
}

const Header: FunctionComponent<HeaderProps> = ({
    siteTitle,
}: HeaderProps): ReactElement => (
    <header className="bg-pfl-blue mb-6">
        <div className="mx-auto max-w-4xl py-6 px-4 flex flex-row justify-between">
            <h1 className="text-4xl">
                <Link to="/" className="text-white">
                    {siteTitle}
                </Link>
            </h1>
            <img className="h-16" src={'/pfl-logo.png'} alt="Pantless Fantasy League logo" />
        </div>
    </header>
);

export default Header;
