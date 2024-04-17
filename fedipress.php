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
 * @param $links
 *
 * @return array
 */
function fedipress_settings_link( $links ) {
  $links[] = '<a href="' . admin_url( 'options-general.php?page=fedipress' ) . '">' . __( 'Settings', 'murmurations-node' ) . '</a>';
  return $links;
}
\add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), __NAMESPACE__ . '\fedipress_settings_link' );

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

