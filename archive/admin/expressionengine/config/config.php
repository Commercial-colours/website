<?php

if ( ! defined('EXT')){
exit('Invalid file request');
}

$protocol                       = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") ? "https://" : "http://";
$base_url                       = $protocol . $_SERVER['HTTP_HOST'];
$base_path                      = $_SERVER['DOCUMENT_ROOT'];
$system_folder                  = "admin";
$uploads_folder                  = "images";
$uploads_path                    = $base_path . "/" . $uploads_folder;
$uploads_url                     = $base_url . "/" . $uploads_folder;

/* Universal database connection settings
-------------------------------------------------------------------*/
$active_group = 'expressionengine';
$active_record = TRUE;
$db['expressionengine']['dbdriver'] = "mysql";
$db['expressionengine']['dbprefix'] = "exp_";
$db['expressionengine']['pconnect'] = FALSE;
$db['expressionengine']['swap_pre'] = "exp_";
$db['expressionengine']['db_debug'] = FALSE;
$db['expressionengine']['cache_on'] = FALSE;
$db['expressionengine']['autoinit'] = FALSE;
$db['expressionengine']['char_set'] = "utf8";
$db['expressionengine']['dbcollat'] = "utf8_general_ci";
$db['expressionengine']['cachedir'] = $base_path . $system_folder . "/expressionengine/cache/db_cache/";

// include with relevant db etc settings

if($_SERVER['HTTP_HOST'] == 'www.commercialcolours.co.uk' || $_SERVER['HTTP_HOST'] == 'commercialcoloursltd.hostinguk.org') {

// production database details
$db['expressionengine']['hostname'] = "mysql01.myhostcp.com";
$db['expressionengine']['username'] = "expressionengine";
$db['expressionengine']['password'] = "GCP>c:FjKMrX91RxWY";
$db['expressionengine']['database'] = "admincom9583uk9331_";
$config['uri_protocol']	= "AUTO";

$env_global_vars = array(
    'gv_env' => 'prod',
);

} elseif($_SERVER['HTTP_HOST'] == 'test.com' ) {

// test database details

$db['expressionengine']['hostname'] = "localhost";
$db['expressionengine']['username'] = "xxx";
$db['expressionengine']['password'] = "xxx";
$db['expressionengine']['database'] = "xxx";
$config['uri_protocol']	= "AUTO";

$env_global_vars = array(
    'gv_env' => 'test',
);

} else {

// local database details

$db['expressionengine']['hostname'] = "localhost";
$db['expressionengine']['username'] = "root";
$db['expressionengine']['password'] = "password";
$db['expressionengine']['database'] = "commercialcolours";
$config['uri_protocol']	= "AUTO";
$config['show_profiler']        = "n"; # y/n
$config['debug']                = "1"; # 0: no PHP/SQL errors shown. 1: Errors shown to Super Admins. 2: Errors shown to everyone.

$env_global_vars = array(
    'gv_env' => 'local',
);

}

// declaring some global variables that can be used within our templates

$new_global_vars = array(
    // Tag parameters - short hand
    'gv_param_disable_default'			=> 'disable="categories|pagination|member_data"',
    'gv_param_disable_all'				=> 'disable="categories|pagination|member_data|custom_fields"',

    // Date & time - short hand values
    'gv_date_time'		=>		'format="%g:%i %a"',			//	12:59 am/pm
    'gv_date_short'		=>		'format="%F %d, %Y"',			//	January 01 1999
    'gv_date_full'		=>		'format="%F %d %Y, %g:%i %a"', 	//	January 01 1999 12:59 am/pm
);

/* Turn $_GET and $_POST into global variables */
foreach ($_GET as $key => $value) {
  if(!is_array($value)) {
    $new_global_vars['get:' . $key] = $value;
  }
}

foreach ($_POST as $key => $value) {
  if(!is_array($value)) {
    $new_global_vars['post:' . $key] = $value;
  }
}

// Make this global so we can merge the new config variables into it
global $assign_to_config;

if(!isset($assign_to_config['global_vars'])) {
    $assign_to_config['global_vars'] = array();
}

$assign_to_config['global_vars'] = array_merge($assign_to_config['global_vars'], $env_global_vars, $new_global_vars);

$config['app_version'] = "261";
$config['install_lock'] = "1";
$config['license_number'] = "xxxx-xxxx-xxxx-xxxx";
$config['doc_url']              = "http://www.ghijk.co.uk/expressionengine";

$config['is_system_on'] = "y";
$config['cookie_prefix'] = "";

$config['allow_extensions'] = "y";
$config['multiple_sites_enabled'] = "n";

$config['index_page']           = "";
$config['base_url']             = $base_url . "/";
$config['site_url']             = $config['base_url'];
$config['site_label']			= "xxx";
$config['cp_url']               = $config['base_url'] . $system_folder . "/index.php";
$config['theme_folder_path']    = $base_path . "/themes/";
$config['theme_folder_url']     = $base_url . "/themes/";
$config['third_party_path']     = $base_path . "/assets/third_party/";

// Template stuff
$config['snippet_file_basepath'] = $base_path . "/assets/snippets/";
$config['snippets_sync_prefix'] = "sn_";
$config['save_tmpl_files']		= "y";
$config['tmpl_file_basepath']   = $base_path . "/assets/templates/";
$config['template_debugging']   = "y"; # y/n
$config['hidden_template_indicator'] = "_";

// Minimee preferences
$config['minimee_cache_path'] = $base_path . '/assets/cache';
$config['minimee_cache_url'] = '/assets/cache';
$config['minimee_disable'] = $base_url == "ee.dev" ? 'y' : 'n';


// Image resizer plugins
$config['ed_server_path'] = $base_path;
$config['ed_cache_path'] = $base_path . '/assets/cache/';
$config['ce_image_cache_dir'] = "/assets/cache/made/";
$config['ce_image_remote_dir'] = "/assets/cache/remote/";

// Custom Upload Directory Paths
$config['upload_preferences'] = array(
    1 => array(
    'name'        => 'Images',
    'server_path' => $base_path . '/assets/images/',
    'url'         => $base_url  . '/assets/images/'
    )
);

$config['profile_trigger'] = rand(0,time()); // randomize the member profile trigger word because we'll never need it
$config['new_version_check'] = 'n';

$config['site_404'] = "404/index";
$config['strict_urls'] = "n";
$config['word_separator']		= "underscore";

$config['emoticon_path']        = $uploads_url . "/smileys/";
$config['captcha_path']         = $uploads_path . "/captchas/";
$config['captcha_url']          = $uploads_url . "/captchas/";
$config['avatar_path']            = $uploads_path . "/avatars/";
$config['avatar_url']            = $uploads_url . "/avatars/";
$config['photo_path']            = $uploads_path . "/member_photos/";
$config['photo_url']            = $uploads_url . "/member_photos/";
$config['sig_img_path']         = $uploads_path . "/signature_attachments/";
$config['sig_img_url']          = $uploads_url . "/signature_attachments/";
$config['prv_msg_upload_path']  = $uploads_path . "/pm_attachments/";


$config['disable_all_tracking'] = "y"; # y/n
$config['enable_sql_caching']   = "n"; # Cache Dynamic Channel Queries?
$config['email_debug']          = "n"; # y/n

$config['enable_db_caching'] = "n";

$config['url_suffix'] = "";
$config['language']	= "english";
$config['charset'] = "UTF-8";
$config['enable_hooks'] = FALSE;
$config['subclass_prefix'] = "EE_";
$config['permitted_uri_chars'] = "a-z 0-9~%.:_\-";
$config['enable_query_strings'] = FALSE;
$config['directory_trigger'] = "D";
$config['controller_trigger'] = "C";
$config['function_trigger'] = "M";
$config['log_threshold'] = 0;
$config['log_path'] = "";
$config['log_date_format'] = "Y-m-d H:i:s";
$config['cache_path'] = "";
$config['encryption_key'] = "";
$config['global_xss_filtering'] = FALSE;
$config['csrf_protection'] = FALSE;
$config['compress_output'] = FALSE;
$config['time_reference'] = "local";
$config['rewrite_short_tags'] = TRUE;
$config['proxy_ips'] = "";
?>