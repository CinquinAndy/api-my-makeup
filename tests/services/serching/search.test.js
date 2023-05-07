const {
  searchingMakeup,
} = require("../../../src/api/searching/services/searching");
const { describe, expect, it, beforeAll, afterAll } = require("@jest/globals");
const fs = require("fs");
const { setupStrapi, stopStrapi } = require("../../helpers/strapi");
const schema = require("../../../src/api/makeup-artiste/content-types/makeup-artiste/schema.json");
const skillsSchema = require("../../../src/components/makeupartists/skills.json");
const serviceOffersSchema = require("../../../src/components/makeupartists/service-offers.json");
const optionsSchema = require("../../../src/components/service-offers/options.json");
const networksSchema = require("../../../src/components/makeupartists/network.json");

describe("test du service searching", () => {
  beforeAll(async () => {
    await setupStrapi();
  }, 20000);

  afterAll(async () => {
    await stopStrapi();
  });

  it("strapi is defined", () => {
    expect(strapi).toBeDefined();
  });

  it("check the structure of the makeup artiste", async () => {
    // check the structure of the makeup artiste

    expect(schema).toHaveProperty("attributes");
    expect(schema).toHaveProperty("attributes.last_name");
    expect(schema).toHaveProperty("attributes.first_name");
    expect(schema).toHaveProperty("attributes.city");
    expect(schema).toHaveProperty("attributes.description");
    expect(schema).toHaveProperty("attributes.speciality");

    expect(schema).toHaveProperty("attributes.skills");
    expect(skillsSchema).toHaveProperty("attributes.name");
    expect(skillsSchema).toHaveProperty("attributes.description");

    expect(schema).toHaveProperty("attributes.service_offers");
    expect(serviceOffersSchema).toHaveProperty("attributes.name");
    expect(serviceOffersSchema).toHaveProperty("attributes.description");
    expect(serviceOffersSchema).toHaveProperty("attributes.options");
    expect(optionsSchema).toHaveProperty("attributes.name");
    expect(optionsSchema).toHaveProperty("attributes.description");

    expect(schema).toHaveProperty("attributes.network");
    expect(networksSchema).toHaveProperty("attributes.phone");
    expect(networksSchema).toHaveProperty("attributes.email");
    expect(networksSchema).toHaveProperty("attributes.website");
    expect(networksSchema).toHaveProperty("attributes.facebook");
    expect(networksSchema).toHaveProperty("attributes.instagram");
    expect(networksSchema).toHaveProperty("attributes.linkedin");
    expect(networksSchema).toHaveProperty("attributes.youtube");
  });

  describe("test de la function searchingMakeup", () => {
    it("should throw an error if search params is not defined", async () => {
      await expect(searchingMakeup()).rejects.toThrow(
        "No search parameters found"
      );
    });

    // todo : test search params if it is empty

    it("should return an error if search params is empty", async () => {
      await expect(searchingMakeup({})).rejects.toThrow(
        "No search parameters found"
      );
    });

    // todo : test search params if it is not empty and city is not defined

    it("should return all makeup artiste if search params is not empty and city is not defined", async () => {
      const allMakeupArtiste = await strapi.entityService.findMany(
        "api::makeup-artiste.makeup-artiste",
        {}
      );
      const makeupArtiste = await searchingMakeup({ search: "John" });
      expect(makeupArtiste).toEqual(allMakeupArtiste);
    });

    // todo : test search params if it is not empty and city is defined

    it("should return some makeup artiste if search params is not empty and city is defined", async () => {
      strapi.entityService = {
        findMany: jest.fn().mockResolvedValue(allMakeupArtiste),
      };

      const makeupArtiste = await searchingMakeup({ search: "Toboggan" });
      expect(makeupArtiste).toEqual([
        {
          id: 5,
          last_name: "Chevalier",
          first_name: "Fanny",
          speciality: "Ongles",
          city: "Tours",
          action_radius: 25,
          available: true,
          description: "Je suis Fanny",
          createdAt: "2023-05-07T13:01:12.425Z",
          updatedAt: "2023-05-07T16:03:00.753Z",
          skills: [
            {
              id: 27,
              name: "mains",
              description: null,
            },
            {
              id: 28,
              name: "les pieds",
              description: "toboggan",
            },
          ],
          experiences: [
            {
              id: 34,
              company: "Insti'art",
              job_name: "Institue art",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
            {
              id: 35,
              company: "Insti'art2",
              job_name: "Institue art 2",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
          ],
          courses: [
            {
              id: 18,
              diploma: "art et boté",
              school: "diplomatica",
              date_graduation: "2023-04-06",
              course_description: "france",
            },
          ],
          service_offers: [
            {
              id: 18,
              name: "mains",
              description: "je te colorie les mains en bleu comme shrek",
              price: "69.0",
            },
          ],
          network: {
            id: 18,
            youtube: "twitter.com",
            facebook: "youtube.com",
            instagram: "youtube.com",
            website: "youtube.com",
            linkedin: null,
            phone: "0783510664",
            email: "fanny@fe.fe",
          },
          score: 11.000000014901163,
        },
      ]);
    });

    // todo : test search params if makeup artiste is not fully completed

    it("should return some makeup artiste if search params is not empty and city is defined", async () => {
      strapi.entityService = {
        findMany: jest.fn().mockResolvedValue(allMakeupArtiste),
      };

      const makeupArtiste = await searchingMakeup({
        search: "sarah@gmail.com",
        city: "Nantes",
      });
      expect(makeupArtiste).toEqual([
        {
          id: 1,
          last_name: "Lagrange",
          first_name: "Milo",
          speciality: "mains",
          city: "Nantes",
          action_radius: 25,
          available: true,
          description: "Je suis steph",
          createdAt: "2023-05-06T17:23:27.214Z",
          updatedAt: "2023-05-06T17:37:49.724Z",
          skills: [
            {
              id: 19,
              name: "mains",
              description: null,
            },
            {
              id: 20,
              name: "les pieds",
              description: null,
            },
          ],
          experiences: [
            {
              id: 26,
              company: "Insti'art",
              job_name: "Institue art",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
            {
              id: 27,
              company: "Insti'art2",
              job_name: "Institue art 2",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
          ],
          courses: [
            {
              id: 14,
              diploma: "art et boté",
              school: "diplomatica",
              date_graduation: "2023-04-06",
              course_description: "france",
            },
          ],
          service_offers: [
            {
              id: 14,
              name: "mains",
              description: "je te colorie les mains en bleu comme shrek",
              price: "69.0",
            },
          ],
          network: {
            id: 14,
            youtube: "twitter.com",
            facebook: "youtube.com",
            instagram: "youtube.com",
            website: "youtube.com",
            linkedin: null,
            phone: null,
            email: null,
          },
          score: 9.000000014901161,
        },
        {
          id: 2,
          last_name: "Dubois",
          first_name: "Julie",
          speciality: "Pieds",
          city: "Nantes",
          action_radius: 25,
          available: true,
          description: "Je suis Julie",
          createdAt: "2023-05-07T12:54:17.753Z",
          updatedAt: "2023-05-07T12:54:27.634Z",
          skills: [
            {
              id: 21,
              name: "mains",
              description: null,
            },
            {
              id: 22,
              name: "les pieds",
              description: null,
            },
          ],
          experiences: [
            {
              id: 28,
              company: "Insti'art",
              job_name: "Institue art",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
            {
              id: 29,
              company: "Insti'art2",
              job_name: "Institue art 2",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
          ],
          courses: [
            {
              id: 15,
              diploma: "art et boté",
              school: "diplomatica",
              date_graduation: "2023-04-06",
              course_description: "france",
            },
          ],
          service_offers: [
            {
              id: 15,
              name: "mains",
              description: "je te colorie les mains en bleu comme shrek",
              price: "69.0",
            },
          ],
          network: {
            id: 15,
            youtube: "twitter.com",
            facebook: "youtube.com",
            instagram: "youtube.com",
            website: "youtube.com",
            linkedin: null,
            phone: "0782510664",
            email: "julie@fe.fe",
          },
          score: 9.000000014901161,
        },
        {
          id: 4,
          last_name: "Tapernier",
          first_name: "Eva",
          speciality: "Cheveux",
          city: "Anger",
          action_radius: 25,
          available: true,
          description: "Je suis Eva",
          createdAt: "2023-05-07T13:00:31.331Z",
          updatedAt: "2023-05-07T13:00:31.331Z",
          skills: [
            {
              id: 25,
              name: "mains",
              description: null,
            },
            {
              id: 26,
              name: "les pieds",
              description: null,
            },
          ],
          experiences: [
            {
              id: 32,
              company: "Insti'art",
              job_name: "Institue art",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
            {
              id: 33,
              company: "Insti'art2",
              job_name: "Institue art 2",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
          ],
          courses: [
            {
              id: 17,
              diploma: "art et boté",
              school: "diplomatica",
              date_graduation: "2023-04-06",
              course_description: "france",
            },
          ],
          service_offers: [
            {
              id: 17,
              name: "mains",
              description: "je te colorie les mains en bleu comme shrek",
              price: "69.0",
            },
          ],
          network: {
            id: 17,
            youtube: "twitter.com",
            facebook: "youtube.com",
            instagram: "youtube.com",
            website: "youtube.com",
            linkedin: null,
            phone: "0782510664",
            email: "eva@fe.fe",
          },
          score: 9.707106781186548,
        },
        {
          id: 3,
          last_name: "Gimber",
          first_name: "Sarah",
          speciality: "Joue",
          city: "Paris",
          action_radius: 25,
          available: true,
          description: "Je suis Sarah",
          createdAt: "2023-05-07T12:55:32.273Z",
          updatedAt: "2023-05-07T16:05:04.150Z",
          skills: [
            {
              id: 23,
              name: "mains",
              description: null,
            },
            {
              id: 24,
              name: "les pieds",
              description: null,
            },
          ],
          experiences: [
            {
              id: 30,
              company: "Insti'art",
              job_name: "Institue art",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
            {
              id: 31,
              company: "Insti'art2",
              job_name: "Institue art 2",
              city: "Paris",
              date_start: "2018-04-11",
              date_end: "2019-04-03",
              description: "je coloriais les pieds avec ma langue",
            },
          ],
          courses: [
            {
              id: 16,
              diploma: "art et boté",
              school: "diplomatica",
              date_graduation: "2023-04-06",
              course_description: "france",
            },
          ],
          service_offers: [
            {
              id: 16,
              name: "mains",
              description: "je te colorie les mains en bleu comme shrek",
              price: "69.0",
            },
          ],
          network: {
            id: 16,
            youtube: "twitter.com",
            facebook: "youtube.com",
            instagram: "youtube.com",
            website: "youtube.com",
            linkedin: null,
            phone: null,
            email: "sarah@gmail.com",
          },
          score: 11.200000014901162,
        },
      ]);
    });
  });
});

const allMakeupArtiste = [
  {
    id: 3,
    last_name: "Gimber",
    first_name: "Sarah",
    speciality: "Joue",
    city: "Paris",
    action_radius: 25,
    available: true,
    description: "Je suis Sarah",
    createdAt: "2023-05-07T12:55:32.273Z",
    updatedAt: "2023-05-07T16:05:04.150Z",
    skills: [
      { id: 23, name: "mains", description: null },
      { id: 24, name: "les pieds", description: null },
    ],
    experiences: [
      {
        id: 30,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 31,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 16,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 16,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 16,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: null,
      email: "sarah@gmail.com",
    },
  },
  {
    id: 1,
    last_name: "Lagrange",
    first_name: "Milo",
    speciality: "mains",
    city: "Nantes",
    action_radius: 25,
    available: true,
    description: "Je suis steph",
    createdAt: "2023-05-06T17:23:27.214Z",
    updatedAt: "2023-05-06T17:37:49.724Z",
    skills: [
      { id: 19, name: "mains", description: null },
      { id: 20, name: "les pieds", description: null },
    ],
    experiences: [
      {
        id: 26,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 27,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 14,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 14,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 14,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: null,
      email: null,
    },
  },
  {
    id: 2,
    last_name: "Dubois",
    first_name: "Julie",
    speciality: "Pieds",
    city: "Nantes",
    action_radius: 25,
    available: true,
    description: "Je suis Julie",
    createdAt: "2023-05-07T12:54:17.753Z",
    updatedAt: "2023-05-07T12:54:27.634Z",
    skills: [
      { id: 21, name: "mains", description: null },
      { id: 22, name: "les pieds", description: null },
    ],
    experiences: [
      {
        id: 28,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 29,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 15,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 15,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 15,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: "0782510664",
      email: "julie@fe.fe",
    },
  },
  {
    id: 4,
    last_name: "Tapernier",
    first_name: "Eva",
    speciality: "Cheveux",
    city: "Anger",
    action_radius: 25,
    available: true,
    description: "Je suis Eva",
    createdAt: "2023-05-07T13:00:31.331Z",
    updatedAt: "2023-05-07T13:00:31.331Z",
    skills: [
      { id: 25, name: "mains", description: null },
      { id: 26, name: "les pieds", description: null },
    ],
    experiences: [
      {
        id: 32,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 33,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 17,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 17,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 17,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: "0782510664",
      email: "eva@fe.fe",
    },
  },
  {
    id: 5,
    last_name: "Chevalier",
    first_name: "Fanny",
    speciality: "Ongles",
    city: "Tours",
    action_radius: 25,
    available: true,
    description: "Je suis Fanny",
    createdAt: "2023-05-07T13:01:12.425Z",
    updatedAt: "2023-05-07T16:03:00.753Z",
    skills: [
      { id: 27, name: "mains", description: null },
      {
        id: 28,
        name: "les pieds",
        description: "toboggan",
      },
    ],
    experiences: [
      {
        id: 34,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 35,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 18,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 18,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 18,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: "0783510664",
      email: "fanny@fe.fe",
    },
  },
  {
    id: 6,
    last_name: "Cinquin",
    first_name: "Edwina",
    speciality: "Fesses",
    city: "Monpelier",
    action_radius: 25,
    available: true,
    description: "Je suis Edwige",
    createdAt: "2023-05-07T13:02:09.598Z",
    updatedAt: "2023-05-07T13:02:09.598Z",
    skills: [
      { id: 29, name: "mains", description: null },
      { id: 30, name: "les pieds", description: null },
    ],
    experiences: [
      {
        id: 36,
        company: "Insti'art",
        job_name: "Institue art",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
      {
        id: 37,
        company: "Insti'art2",
        job_name: "Institue art 2",
        city: "Paris",
        date_start: "2018-04-11",
        date_end: "2019-04-03",
        description: "je coloriais les pieds avec ma langue",
      },
    ],
    courses: [
      {
        id: 19,
        diploma: "art et boté",
        school: "diplomatica",
        date_graduation: "2023-04-06",
        course_description: "france",
      },
    ],
    service_offers: [
      {
        id: 19,
        name: "mains",
        description: "je te colorie les mains en bleu comme shrek",
        price: "69.0",
      },
    ],
    network: {
      id: 19,
      youtube: "twitter.com",
      facebook: "youtube.com",
      instagram: "youtube.com",
      website: "youtube.com",
      linkedin: null,
      phone: "0782510664",
      email: "edwige@fe.fe",
    },
  },
];
