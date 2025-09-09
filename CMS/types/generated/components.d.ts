import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_abouts';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    highlightDescription: Schema.Attribute.Text;
    highlightTitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text;
  };
}

export interface BlocksAchievements extends Struct.ComponentSchema {
  collectionName: 'components_blocks_achievements';
  info: {
    description: '';
    displayName: 'Achievements';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlightTitle: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'ui.counter-list', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksApproaches extends Struct.ComponentSchema {
  collectionName: 'components_blocks_approaches';
  info: {
    displayName: 'Approaches';
  };
  attributes: {
    section: Schema.Attribute.Component<'blocks.services', false>;
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

export interface BlocksFooter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    buttonTitle: Schema.Attribute.String & Schema.Attribute.Required;
    copyright: Schema.Attribute.String & Schema.Attribute.Required;
    email: Schema.Attribute.String & Schema.Attribute.Required;
    ipn: Schema.Attribute.Text & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface BlocksMenu extends Struct.ComponentSchema {
  collectionName: 'components_blocks_menus';
  info: {
    displayName: 'Menu';
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

export interface BlocksModal extends Struct.ComponentSchema {
  collectionName: 'components_blocks_modals';
  info: {
    description: '';
    displayName: 'Modal';
  };
  attributes: {
    button: Schema.Attribute.String & Schema.Attribute.Required;
    highlightTitle: Schema.Attribute.String;
    mainError: Schema.Attribute.String & Schema.Attribute.Required;
    nameLabel: Schema.Attribute.String & Schema.Attribute.Required;
    phoneError: Schema.Attribute.String & Schema.Attribute.Required;
    phoneLabel: Schema.Attribute.String & Schema.Attribute.Required;
    sendingText: Schema.Attribute.Text & Schema.Attribute.Required;
    sendingTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksReviews extends Struct.ComponentSchema {
  collectionName: 'components_blocks_reviews';
  info: {
    description: '';
    displayName: 'Reviews';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlightTitle: Schema.Attribute.Text;
    list: Schema.Attribute.Component<'ui.reviews-list', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRoadmap extends Struct.ComponentSchema {
  collectionName: 'components_blocks_roadmaps';
  info: {
    displayName: 'Roadmap';
  };
  attributes: {
    highlightTitle: Schema.Attribute.String;
    list: Schema.Attribute.Component<'ui.roadmap-list', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface UiCounterList extends Struct.ComponentSchema {
  collectionName: 'components_ui_counter_lists';
  info: {
    displayName: 'CounterList';
  };
  attributes: {
    count: Schema.Attribute.String & Schema.Attribute.Required;
    symbol: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
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

export interface UiReviewsList extends Struct.ComponentSchema {
  collectionName: 'components_ui_reviews_lists';
  info: {
    displayName: 'ReviewsList';
  };
  attributes: {
    company: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface UiRoadmapList extends Struct.ComponentSchema {
  collectionName: 'components_ui_roadmap_lists';
  info: {
    displayName: 'RoadmapList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
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
      'blocks.achievements': BlocksAchievements;
      'blocks.approaches': BlocksApproaches;
      'blocks.business-main-screen': BlocksBusinessMainScreen;
      'blocks.footer': BlocksFooter;
      'blocks.main-screen': BlocksMainScreen;
      'blocks.menu': BlocksMenu;
      'blocks.modal': BlocksModal;
      'blocks.reviews': BlocksReviews;
      'blocks.roadmap': BlocksRoadmap;
      'blocks.services': BlocksServices;
      'ui.button': UiButton;
      'ui.counter-list': UiCounterList;
      'ui.main-header': UiMainHeader;
      'ui.paragraphs': UiParagraphs;
      'ui.reviews-list': UiReviewsList;
      'ui.roadmap-list': UiRoadmapList;
      'ui.spinning-text': UiSpinningText;
    }
  }
}
