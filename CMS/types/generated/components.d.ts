import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    displayName: 'About';
  };
  attributes: {
    text: Schema.Attribute.RichText;
    title: Schema.Attribute.Text;
  };
}

export interface BlocksMainScreen extends Struct.ComponentSchema {
  collectionName: 'components_blocks_main_screens';
  info: {
    description: '';
    displayName: 'Main Screen';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.button', false> &
      Schema.Attribute.Required;
    companyName: Schema.Attribute.String & Schema.Attribute.Required;
    companySubname: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    slogan: Schema.Attribute.Text;
    spinningText: Schema.Attribute.Component<'ui.spinning-text', true>;
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
      'blocks.main-screen': BlocksMainScreen;
      'ui.button': UiButton;
      'ui.spinning-text': UiSpinningText;
    }
  }
}
