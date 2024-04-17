<?php
/**
 * Plugin Name:     FediPress
 * Plugin URI:      https://codeberg.org/OpenForFuture/FediPress
 * Description:     An ActivityPub chat PWA for WordPress.
 * Author:          MediaFormat
 * Author URI:      https://mediaformat.org
 * Text Domain:     fedipress
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         FediPress
 */

namespace FediPress;


/**
 * register_plugin_settings_page
 *
 * @return void
 */
function register_plugin_settings_page() {
	$page_hook_suffix = \add_options_page(
		__( 'FediPress', 'fedipress' ),
		__( 'FediPress', 'fedipress' ),
		'manage_options',
		'fedipress',
		__NAMESPACE__ . '\render_settings_page',
	);
}
\add_action( 'admin_menu', __NAMESPACE__ . '\register_plugin_settings_page' );

/**
 * Renders the settings page
 */
function render_settings_page() {
	?>
	<div id="fedipress">
		<?php esc_html_e( 'Requires JavaScript', 'fedipress' ); ?>
	</div>
	<?php
}

