import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header>
            <div className='header-container'>
                <div className="header-logo">
                    <Link to="/"><img src="../assets/image/logo.png" alt="logo" /></Link>
                </div>
                {/* Nút bật/tắt menu mobile */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    ☰
                </button>
                {/* Menu chính */}
                <nav className={`header-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/Gioithieu">Giới thiệu</Link></li>
                        <li><Link to="/Lienhe">Liên hệ</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
