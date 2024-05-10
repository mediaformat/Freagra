/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import HomeScreen from './components/inbox-screen';
import './admin.scss';

// Render the app to the screen.
const container = document.getElementById('freagra');
const root = createRoot(container);
window.addEventListener(
    'load',
    function () {
        root.render(<HomeScreen />);
    },
    false
);
