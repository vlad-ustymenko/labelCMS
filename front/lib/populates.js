export const homePopulate = {
  blocks: {
    on: {
      "blocks.main-screen": {
        populate: {
          spinningText: { fields: ["text"] },
          header: { populate: "*" },
        },
      },
      "blocks.about": { populate: "*" },
      "blocks.services": { populate: "*" },
      "blocks.achievements": { populate: "*" },
      "blocks.reviews": { populate: "*" },
      "blocks.roadmap": { populate: "*" },
      "blocks.menu": { populate: "*" },
      "blocks.modal": { populate: "*" },
      "blocks.footer": { populate: "*" },
    },
  },
};

export const businessPopulate = {
  blocks: {
    on: {
      "blocks.business-main-screen": {
        populate: {
          spinningText: { fields: ["text"] },
          header: { populate: "*" },
        },
      },
      "blocks.services": { populate: "*" },
      "blocks.approaches": { populate: { section: { populate: "*" } } },
      "blocks.menu": { populate: "*" },
      "blocks.modal": { populate: "*" },
      "blocks.footer": { populate: "*" },
    },
  },
};

export const projectsPopulate = {
  fields: ["title", "description", "slug", "year", "customer", "createdAt"],
  populate: {
    mainImage: {
      fields: ["url"],
    },
  },
};

export const projectPopulate = {
  fields: ["title", "description", "slug", "year", "customer", "createdAt"],
  populate: {
    mainImage: {
      fields: ["url"],
    },
    images: {
      fields: ["url"],
    },
    paragraphs: {
      fields: ["paragraphs"],
    },
  },
};
