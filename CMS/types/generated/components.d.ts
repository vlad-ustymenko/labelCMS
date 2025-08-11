import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    highlightText: Schema.Attribute.Text;
    highlightTitle: Schema.Attribute.Text;
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.Text;
  };
}

export interface BlocksBusinessMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_business_main_screens';
  info: {
    description: '';
    displayName: 'Business Main Screen';
  };
  attributes: {
    header: Schema.Attribute.Component<'ui.main-header', false>;
    slogan: Schema.Attribute.Text;
    spinningText: Schema.Attribute.Component<'ui.spinning-text', true>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_main_screens';
  info: {
    description: '';
    displayName: 'Main Screen';
  };
  attributes: {
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    companySubname: Schema.Attribute.String & Schema.Attribute.Required;
    header: Schema.Attribute.Component<'ui.main-header', false>;
    image: Schema.Attribute.Media<'images'>;
    slogan: Schema.Attribute.Text;
    spinningText: Schema.Attribute.Component<'ui.spinning-text', true>;
  };
}

export interface BlocksServices extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services';
  info: {
    description: '';
    displayName: 'Services';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    highlightTitle: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'ui.paragraphs', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiMainHeader extends Struct.ComponentSchema {
  collectionName: 'components_ui_main_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    businessButton: Schema.Attribute.String & Schema.Attribute.Required;
    businessHref: Schema.Attribute.String & Schema.Attribute.Required;
    mainButton: Schema.Attribute.String & Schema.Attribute.Required;
    mainHref: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    projectsButton: Schema.Attribute.String & Schema.Attribute.Required;
    projectsHref: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiParagraphs extends Struct.ComponentSchema {
  collectionName: 'components_ui_paragraphs';
  info: {
    displayName: 'Paragraphs';
  };
  attributes: {
    paragraphs: Schema.Attribute.RichText;
  };
}

export interface UiSpinningText extends Struct.ComponentSchema {
  collectionName: 'components_ui_spinning_texts';
  info: {
    displayName: 'SpinningText';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about': BlocksAbout;
      'blocks.business-main-screen': BlocksBusinessMainScreen;
      'blocks.main-screen': BlocksMainScreen;
      'blocks.services': BlocksServices;
      'ui.button': UiButton;
      'ui.main-header': UiMainHeader;
      'ui.paragraphs': UiParagraphs;
      'ui.spinning-text': UiSpinningText;
    }
  }
}
