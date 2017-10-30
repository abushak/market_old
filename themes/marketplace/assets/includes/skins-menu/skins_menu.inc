
<?php

use Drupal\Core\Language\Language;
use Drupal\Core\Language\LanguageInterface;

use Drupal\Core\Theme\ThemeSettings;

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
global $theme_key;
$theme_key = skmn_get_theme_name();

function skmn_get_theme_name()
{
    return \Drupal::theme()->getActiveTheme()->getName();
}

function skmn_render_skins_menu(){

    $skins = skmn_get_skins();
    $current_skin = theme_get_setting('skin');
    if (isset($_COOKIE['weebpal_skin'])) {
        $current_skin = $_COOKIE['weebpal_skin'];
    }



    $backgrounds =   skmn_get_backgrounds();
    $current_background = theme_get_setting('background');
    if (isset($_COOKIE['weebpal_background'])) {
        $current_background = $_COOKIE['weebpal_background'];
    }



    $layouts = array (
        'layout-default' => 'Default Layout',
        'layout-boxed' => 'Boxed Layout',
    );
    $current_layout = theme_get_setting('layout');
    if (isset($_COOKIE['weebpal_layout'])) {
        $current_layout = $_COOKIE['weebpal_layout'];
    }



    $direction = array(
        'rtl' => array('name' => '', 'class' => '', 'prefix'=>''),
        'ltr' => array('name' => '', 'class' => '', 'prefix'=>'')
    );
    $languages = Drupal::languageManager()->getLanguages(LanguageInterface::STATE_CONFIGURABLE);
    $default_language = Drupal::languageManager()->getLanguages(LanguageInterface::STATE_SITE_DEFAULT);
    foreach ($default_language as $key => $language) {
        $default_language = $language;
        break;
    }
    $current_language = Drupal::languageManager()->getCurrentLanguage();
    foreach ($languages as $name => $info) {
        $dir = $info->getDirection();
        if ($dir && $direction[$dir]['name'] == '') {
            $direction[$dir]['name'] = $name;
            $direction[$dir]['prefix'] = $name;
        }        
        if ($direction['rtl']['name'] != '' && $direction['ltr']['name'] != '') {
            break;
        }
    }
    $direction[$current_language->getDirection()]['class'] = 'active';
    $direction[$default_language->getDirection()]['prefix'] = '';



    $str = array();
    $str[] = '<div id="change_skin_menu_wrapper" class="change-skin-menu-wrapper wrapper">';
    $str[] = '<div class="container">';
    $str[] = '<a id="change-skin" class="change-skin" href="javascript:void(0)"><i class="nc-icon-glyph ui-1_settings-gear-63"></i></a>';
    //Change skin color
    $str[] = '<div class="skin-color">';
    $str[] = '<strong>Skin</strong>';
    $str[] = '<ul class="change-skin-menu">';
    foreach ($skins as $skin => $skin_title) {
        $li_class = ($skin == $current_skin ? ($skin . ' active') : $skin);
        $str[] = '<li class="' . $li_class . '"><a href="#change-skin/' . $skin . '" class="change-skin-button color-' . $skin . '">' . $skin_title . '</a></li>';
    }
    $str[] = '</ul></div>';
    //Change Layout
    $str[] = '<div class="layout">';
    $str[] = '<strong>Layout Boxed</strong>';
    $str[] = '<label class="switch-btn">';
    foreach ($layouts as $layout => $layout_title) {

        $label_class = ($layout == $current_layout ? ' active' : '');
        $label_title = ($layout == 'layout-boxed' ? 'Yes' : 'No');
        $str[] = '<span id="' . $layout . '" class="btn btn-default change-layout-button ' . $label_class . '">' . $label_title . '</span>';
    }
    $str[] = '</label></div>';
    //Change Background
    if ($current_layout == 'layout-boxed') {
        $str[] = '<div class="background">';
    }
    else {
        $str[] = '<div class="background hidden">';
    }
    $str[] = '<strong>Background</strong>';
    $str[] = '<ul class="change-background">';
    foreach ($backgrounds as $background => $background_title) {
        $li_class = ($background == $current_background ? ($background . ' active') : $background);
        $str[] = '<li class="' . $li_class . '"><a href="#change-background/' . $background . '" class="change-background-button">' . $background_title . '</a></li>';
    }
    $str[] = '</ul></div>';
    //Change Direction
    $str[] = '<div class="direction">';
    $str[] = '<strong>Direction</strong>';
    $str[] = '<ul class="change-direction">';
    $str[] = '<li class="' . $direction['ltr']['class'] . '"><a href="' . base_path() . $direction['ltr']['prefix'] . '" class="change-direction-button">LTR</a></li>';
    $str[] = '<li class="' . $direction['rtl']['class'] . '"><a href="' . base_path() . $direction['rtl']['prefix'] . '" class="change-direction-button">RTL</a></li>';
    $str[] = '</ul></div>';
    $str[] = '</div></div>';



    $result = implode("", $str);
    return $result;
}


function skmn_get_skins(){

    //return skmn_get_skins_alpha_release();
    $skins = array (
        'default' => 'Default Style',
    );
    return $skins;
}

function skmn_get_skins_alpha_release(){

    $skins = array (
        'default' => 'Default Style',
    );
    return $skins;
}


function skmn_get_backgrounds(){

    $backgrounds =   array (
        'bg-default' => 'Default',
        'bg-1' => 'Background 1',
        'bg-2' => 'Background 2',
        'bg-3' => 'Background 3',
        'bg-4' => 'Background 4',
        'bg-5' => 'Background 5',
        'bg-6' => 'Background 6',
        'bg-7' => 'Background 7',
    );
    return $backgrounds;
}


function skmn_get_layouts(){

    $layouts = array (
      'layout-default' => 'Default Layout',
      'layout-boxed' => 'Boxed Layout',
    );
    return $layouts;
}

function skmn_get_direction(){

    $direction = array(
      'rtl' => array('name' => '', 'class' => ''),
      'ltr' => array('name' => '', 'class' => '')
    );
    return $direction;
}

function skmn_get_default_layout_width(){

    $layout_width_default = 1200;
    return $layout_width_default;
}

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
function skmn_settings_layout_group(&$form) {

    global $theme_key;

    $form[$theme_key]['settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('Settings'),
        '#weight' => 0,
    );

    // Calc skins
    $skins = skmn_get_skins();
    if (count($skins) > 1) {
        $form[$theme_key]['settings']['configs'] = array(
            '#type' => 'details',
            '#open' => TRUE,
            '#title' => t('Configs'),
            '#weight' => 0,
        );
        $current_skin = theme_get_setting('skin');
        if (isset($_COOKIE['weebpal_skin'])) {
            $current_skin = $_COOKIE['weebpal_skin'];
        }
        $form[$theme_key]['settings']['configs']['skin'] = array(
            '#type' => 'select',
            '#title' => t('Skin'),
            '#default_value' => $current_skin,
            '#options' => $skins,
        );
    }

    // Calc layout
    $layout = skmn_get_layouts();
    $current_layout = theme_get_setting('layout');
    if (isset($_COOKIE['weebpal_layout'])) {
        $current_layout = $_COOKIE['weebpal_layout'];
    }
    $form[$theme_key]['settings']['configs']['layout'] = array(
        '#type' => 'select',
        '#title' => t('Layout'),
        '#default_value' => $current_layout,
        '#options' => $layout,
        '#weight' => -2,
    );

    /*$current_layout_width = (theme_get_setting('layout_width') == '') ? '1200' : theme_get_setting('layout_width');*/

    if (isset($_COOKIE['weebpal_layout_width'])) {
        $current_layout_width = $_COOKIE['weebpal_layout_width'];
    }
    else{

        $current_layout_width = theme_get_setting('layout_width');
        if(!$current_layout_width){
            $current_layout_width = skmn_get_default_layout_width();
        }
    }


    $form[$theme_key]['settings']['configs']['layout_width'] = array(
        '#type' => 'textfield',
        '#title' => t('Layout Width(px)'),
        '#default_value' => $current_layout_width,
        '#size' => 15,
        '#require' => TRUE,
        '#weight' => -1,
        '#states' => array(
            'visible' => array(
                'select[name="layout"]' => array(
                    'value' => 'layout-boxed',
                ),
            ),
        ),
    );

    // Calc background
    $backgrounds = skmn_get_backgrounds();
    $current_background = theme_get_setting('background');
    if (isset($_COOKIE['weebpal_background'])) {
        $current_background = $_COOKIE['weebpal_background'];
    }    
    $form[$theme_key]['settings']['configs']['background'] = array(
        '#type' => 'select',
        '#title' => t('Background'),
        '#default_value' => $current_background,
        '#options' => $backgrounds,
        '#weight' => 1,
    );

    // Calc default theme settings
    $features = theme_get_setting('features');

    $form['theme_settings']['toggle_logo']['#default_value'] = theme_get_setting('logo')['use_default'];
    //$form['theme_settings']['toggle_name']['#default_value'] = theme_get_setting('toggle_name');
    //$form['theme_settings']['toggle_slogan']['#default_value'] = theme_get_setting('toggle_slogan');
    $form['theme_settings']['toggle_node_user_picture']['#default_value'] = $features['node_user_picture'];
    $form['theme_settings']['toggle_comment_user_picture']['#default_value'] = $features['comment_user_picture'];
    $form['theme_settings']['toggle_comment_user_verification']['#default_value'] = $features['comment_user_verification'];
    $form['theme_settings']['toggle_favicon']['#default_value'] = $features['favicon'];
    
    //$form['theme_settings']['toggle_secondary_menu']['#default_value'] = theme_get_setting('toggle_secondary_menu');

    $form['theme_settings']['show_skins_menu'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show Skins Menu'),
        '#default_value' => theme_get_setting('show_skins_menu'),
    );


    $form['theme_settings']['loading_page'] = array(
        '#type' => 'checkbox',
        '#title' => t('Use loading'),
        '#default_value' => theme_get_setting('loading_page'),
    );

    $logo = theme_get_setting('logo');
    $form['logo']['default_logo']['#default_value'] = $logo['use_default'];
    $form['logo']['settings']['logo_path']['#default_value'] = $logo['path'];
    $form['logo']['#collapsible'] = TRUE;
    $form['logo']['#collapsed'] = FALSE;

    $favicon = theme_get_setting('favicon');
    $form['favicon']['default_favicon']['#default_value'] = $favicon['use_default'];
    $form['favicon']['settings']['favicon_path']['#default_value'] = $favicon['path'];
    $form['favicon']['#collapsible'] = TRUE;
    $form['favicon']['#collapsed'] = FALSE;

    $form['theme_settings']['#collapsible'] = TRUE;
    $form['theme_settings']['#collapsed'] = FALSE;
    
    
    $form[$theme_key]['settings']['theme_settings'] = $form['theme_settings'];
    $form[$theme_key]['settings']['logo'] = $form['logo'];
    $form[$theme_key]['settings']['favicon'] = $form['favicon'];

    unset($form['theme_settings']);
    unset($form['logo']);
    unset($form['favicon']);

}

function skmn_save_settings($input) {

    if(isset($input['skin'])) {
        setcookie('weebpal_skin', $input['skin'], time() + 100000, base_path());
    }

    if (isset($input['layout'])) {
        setcookie('weebpal_layout', $input['layout'], time() + 100000, base_path());
    }

    if (isset($input['layout_width'])) {
        setcookie('weebpal_layout_width', $input['layout_width'], time() + 100000, base_path());
    }

    if (isset($input['background'])) {
        setcookie('weebpal_background', $input['background'], time() + 100000, base_path());
    }
}


function skmn_reset_settings() {


    /*variable_del('theme_' . $theme_key . '_settings');
    variable_del('theme_settings');
    $cache = &drupal_static('theme_get_setting', array());
    $cache[$theme_key] = NULL;*/

    global $theme_key;

    //var_dump(\Drupal::config($theme_key. '.settings')->get());

    $default_settings = array (
        '_version' => '',
        'skin' => 'default',
        'layout' => 'layout-default',
        'layout_width' => '1200',
        'background' => 'bg-default',
        'features' => 
        array (
            'node_user_picture' => true,
            'comment_user_picture' => true,
            'comment_user_verification' => true,
            'favicon' => true,
        ),
        'show_skins_menu' => 1,
        'loading_page' => 0,
        'logo' => 
        array (
            'use_default' => true,
            'path' => '',
        ),
        'favicon' => 
        array (
            'use_default' => true,
            'path' => '',
        ),
        'skmn_use_default_settings' => 0,
        $theme_key.'_version' => '1.0',
    );


    $config = \Drupal::service('config.factory')->getEditable($theme_key . '.settings');

    $config->setData($default_settings)->save();

    $cache = &drupal_static('theme_get_setting', array());
    $cache[$theme_key] = NULL;

}

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


function skmn_preprocess_html(&$variables){

    // Skin menu
    $current_skin = theme_get_setting('skin');
    if (isset($_COOKIE['weebpal_skin'])) {
      $current_skin = $_COOKIE['weebpal_skin'];
    }
    if (!empty($current_skin) && $current_skin != 'default') {
      $variables['attributes']['class'][] .= " skin-$current_skin";
    }
    $current_layout = theme_get_setting('layout');
    if (isset($_COOKIE['weebpal_layout'])) {
        $current_layout = $_COOKIE['weebpal_layout'];
    }
    if ($current_layout == 'layout-boxed') {

        $current_background = theme_get_setting('background');
        if (isset($_COOKIE['weebpal_background'])) {
          $current_background = $_COOKIE['weebpal_background'];
        }
        if (!empty($current_background)) {
          $variables['attributes']['class'][] .= ' ' . $current_background;
        }
    }
}



function skmn_preprocess_page(&$variables){
    
    global $theme_key;

    $current_skin = theme_get_setting('skin');
    if (isset($_COOKIE['weebpal_skin'])) {
        $current_skin = $_COOKIE['weebpal_skin'];
    }
    $variables['page']['weebpal_skin_classes'] = (!empty($current_skin) ? ($current_skin . "-skin") : "");
    if (!empty($current_skin) && 
        $current_skin != 'default' && 
        theme_get_setting("default_logo") && 
        theme_get_setting("toggle_logo")) {

        $variables['logo'] = file_create_url(drupal_get_path('theme', $theme_key)) . "/css/colors/" . $current_skin . "/images/logo.png";
    }
    if (!empty($current_skin)) {

        /*$pathfile = drupal_get_path('theme', $theme_key) . "/css/colors/" . $current_skin . "/style.css";
      
        if (file_exists($pathfile)) {

            drupal_add_css($pathfile, array(
                'group' => CSS_THEME,
            ));
        }*/
    }



    $layout_width = theme_get_setting('layout_width');
    if (isset($_COOKIE['weebpal_layout_width'])) {
        $layout_width = $_COOKIE['weebpal_layout_width'];
    } elseif (!$layout_width){

        $layout_width = skmn_get_default_layout_width();
    }    
    
    $show_skins_menu = theme_get_setting('show_skins_menu');
    if($show_skins_menu) {

        $current_layout = theme_get_setting('layout');
        if (isset($_COOKIE['weebpal_layout'])) {
            $current_layout = $_COOKIE['weebpal_layout'];
        }
        if ($current_layout == 'layout-boxed') {
            $variables['page_css'] = 'style= "max-width: ' . $layout_width . 'px; margin: 0 auto;"';
            $variables['attributes']['class'][] = 'boxed';
        }
        $skins_menu = skmn_render_skins_menu();
        $variables['page']['show_skins_menu']= $skins_menu;
    }


    // Add library
    $variables['#attached']['library'][] = $theme_key.'/skins-menu';
}


function skmn_form_system_theme_settings_alter(&$form, $form_state) {

    global $theme_key;

    $form[$theme_key][$theme_key.'_version'] = array(
        '#type' => 'hidden',
        '#default_value' => '1.0',
    );

    skmn_settings_layout_group($form);


    $form['#submit'][] = 'skmn_form_system_theme_settings_submit';

    $form['actions'] = array(
        '#type' => 'actions'
    );

// lkmark
  $form['actions']['save_settings'] = array(
    '#type' => 'submit',
    '#value' => t('Save configuration'),
  );

  $form['actions']['reset_settings'] = array(
    '#type' => 'submit',
    '#value' => t('Reset theme settings'),
    '#attributes' => array(
        'onclick' => 'return Drupal.SkinsMenu.onClickResetDefaultSettings();'
    ),
    '#submit' => array('skmn_form_system_theme_settings_submit'),
  );

    // Add library
    $form['#attached']['library'][] = $theme_key.'/skins-menu';
}



function skmn_form_system_theme_settings_submit($form, &$form_state) {

    $input = $form_state->getUserInput();

    if($input['op']=='Save configuration'){
        skmn_save_settings($input);
    }
    elseif($input['op']=='Reset theme settings') {
        skmn_reset_settings();
    }
}




