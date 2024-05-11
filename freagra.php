<?php
/**
 * Plugin Name:     Freagra
 * Plugin URI:      https://github.com/mediaformat/Freagra
 * Description:     A Social client for WordPress-ActivityPub.
 * Author:          MediaFormat
 * Author URI:      https://mediaformat.org
 * Text Domain:     freagra
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Freagra
 */

namespace Freagra;

/**
 * @param $links
 *
 * @return array
 */
function freagra_settings_link( $links ) {
  $links[] = "<a href='" . admin_url( 'options-general.php?page=freagra' ) . "'>" . __( 'Settings', 'murmurations-node' ) . "</a>";
  return $links;
}
\add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), __NAMESPACE__ . '\freagra_settings_link' );

/**
 * register_plugin_settings_page
 *
 * @return void
 */
function register_plugin_settings_page() {
	$page_hook_suffix = \add_options_page(
		__( 'Freagra', 'freagra' ),
		__( 'Freagra', 'freagra' ),
		'manage_options',
		'freagra',
		__NAMESPACE__ . '\render_settings_page',
	);
}
\add_action( 'admin_menu', __NAMESPACE__ . '\register_plugin_settings_page' );

/**
 * Renders the settings page
 */
function render_settings_page() {
	?>
	<div id="freagra">
		<?php esc_html_e( 'Requires JavaScript', 'freagra' ); ?>
	</div>
	<?php
}

/**
 * enqueue_settings_script
 *
 * Enqueue scripts for the settings page
 *
 * @param  mixed $hook
 * @return void
 */
function enqueue_settings_script( $hook ) {
	$asset_file_page = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';
	if ( file_exists( $asset_file_page ) && 'settings_page_freagra' === $hook ) {
		$assets = require $asset_file_page;
		wp_enqueue_media();
		wp_register_script(
			'freagra',
			plugins_url( 'build/index.js', __FILE__ ),
			$assets['dependencies'],
			$assets['version'],
			true
		);
		wp_enqueue_script( 'freagra' );

		foreach ( $assets['dependencies'] as $style ) {
			wp_enqueue_style( $style );
		}

		$dir = __DIR__;
		$admin_css = 'build/index.css';
		wp_enqueue_style(
			'freagra',
			plugins_url( $admin_css, __FILE__ ),
			['wp-components'],
			filemtime( "$dir/$admin_css" )
		);
	}
};
add_action( 'admin_enqueue_scripts',  __NAMESPACE__ . '\enqueue_settings_script' );
