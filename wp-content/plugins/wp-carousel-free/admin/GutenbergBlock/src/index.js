import icons from "./shortcode/blockIcon";
import DynamicShortcodeInput from "./shortcode/dynamicShortcode";
import { escapeAttribute, escapeHTML } from "@wordpress/escape-html";
import {InspectorControls} from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { PanelBody, PanelRow } = wp.components;
const { Fragment } = wp.element;
const ServerSideRender = wp.serverSideRender;
const el = wp.element.createElement;

/**
 * Register: aa Gutenberg Block.
 */
registerBlockType("sp-wp-carousel-free/shortcode", {
  title: escapeHTML( __("WP Carousel", "wp-carousel-free") ),
  description: escapeHTML( __(
    "Use WP Carousel to insert a carousel or gallery in your page.",
    "wp-carousel-free"
  )),
  icon: icons.spwpcfIcon,
  category: "common",
  supports: {
    html: true,
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    
    let scriptLoad = ( shortcodeId ) => {
      let spwpcfBlockLoaded = false;
      let spwpcfBlockLoadedInterval = setInterval(function () {
        let uniqId = jQuery(".wpcp-wrapper-" + shortcodeId).parents().attr('id');
        if (document.getElementById(uniqId)) {
          //Actual functions goes here
          jQuery.getScript(sp_wp_carousel_free.loadScript);
          jQuery('#wpcp-preloader-' + shortcodeId).animate({ opacity: 0 }, 600).remove();
          jQuery('#sp-wp-carousel-free-id-' + shortcodeId).animate({ opacity: 1 }, 600);
          spwpcfBlockLoaded = true;
          uniqId = '';
        }
        if (spwpcfBlockLoaded) {
          clearInterval(spwpcfBlockLoadedInterval);
        }
        if ( 0 == shortcodeId ) {
          clearInterval(spwpcfBlockLoadedInterval);
        }
      }, 10);
    }

    let updateShortcode = ( updateShortcode ) => {
      setAttributes({shortcode: escapeAttribute( updateShortcode.target.value )});
    }

    let shortcodeUpdate = (e) => {
      updateShortcode(e);
      let shortcodeId = escapeAttribute( e.target.value );
      scriptLoad(shortcodeId);
    }

    document.addEventListener('readystatechange', event => {
      if (event.target.readyState === "complete") {
        let shortcodeId = escapeAttribute( attributes.shortcode );
        scriptLoad(shortcodeId);
      }
    });

    if( attributes.preview ) {
      return (
        el('div', {className: 'spwpcf_shortcode_block_preview_image'},
          el('img', { src: escapeAttribute( sp_wp_carousel_free.url + "admin/GutenbergBlock/src/wpc-block-preview.svg" )})
        )
      )
    }

    if (attributes.shortcodelist.length === 0 ) {
      return (
        <Fragment>
          {
            el('div', {className: 'components-placeholder components-placeholder is-large'}, 
              el('div', {className: 'components-placeholder__label'}, 
                el('img', {className: 'block-editor-block-icon', src: escapeAttribute( sp_wp_carousel_free.url + 'admin/GutenbergBlock/src/wp-carousel-icon.svg' )}),
                escapeHTML( __("WP Carousel", "wp-carousel-free") )
              ),
              el('div', {className: 'components-placeholder__instructions'}, 
                escapeHTML( __("No shortcode found. ", "wp-carousel-free") ),
                el('a', {href: escapeAttribute( sp_wp_carousel_free.link )}, 
                  escapeHTML( __("Create a shortcode now!", "wp-carousel-free") )
                )
              )
            )
          }
        </Fragment>
      );
    }

    if ( ! attributes.shortcode || attributes.shortcode == 0 ) {
      return (
        <Fragment>
          <InspectorControls>
            <PanelBody title="Select a shortcode">
                <PanelRow>
                  <DynamicShortcodeInput
                    attributes={attributes}
                    shortcodeUpdate={shortcodeUpdate}
                  />
                </PanelRow>
            </PanelBody>
          </InspectorControls>
          {
            el('div', {className: 'components-placeholder components-placeholder is-large'}, 
              el('div', {className: 'components-placeholder__label'},
                el('img', { className: 'block-editor-block-icon', src: escapeAttribute( sp_wp_carousel_free.url + "admin/GutenbergBlock/src/wp-carousel-icon.svg" )}),
                escapeHTML( __("WP Carousel", "wp-carousel-free") )
              ),
              el('div', {className: 'components-placeholder__instructions'}, escapeHTML( __("Select a shortcode", "wp-carousel-free") ) ),
              <DynamicShortcodeInput
                attributes={attributes}
                shortcodeUpdate={shortcodeUpdate}
              />
            )
          }
        </Fragment>
      );
    }

    return (
      <Fragment>
        <InspectorControls>
            <PanelBody title="Select a shortcode">
                <PanelRow>
                  <DynamicShortcodeInput
                    attributes={attributes}
                    shortcodeUpdate={shortcodeUpdate}
                  />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
        <ServerSideRender block="sp-wp-carousel-free/shortcode" attributes={attributes} />
      </Fragment>
    );
  },
  save() {
    // Rendering in PHP
    return null;
  },
});
