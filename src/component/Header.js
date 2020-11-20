import React, { Component } from 'react'
import '../css/header.css'
class Header extends Component {
    render() {
        return (
            <div className="header">
                <img className="app-header-image"
                src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg"
                alt="instagram"
                />
            </div>
        )
    }
}

export default Header
