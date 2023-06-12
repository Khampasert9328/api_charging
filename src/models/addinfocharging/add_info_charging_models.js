const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddinfomodelsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imagecpn: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    constainner: [
      {
        count: {
          type: String,
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        generation: {
          type: String,
          required: true,
        },
        model: {
          type: String,
          required: true,
        },
        type_charge: [
          {
            type_charging: {
              type: String,
              required: true,
            },
          },
        ],
      },    
    ],

    pictureplace: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    nameplace: {
      type: String,
      required: true,
    },
    facilities: [
      {
        facilitie: {
          type: String,
          required: true,
        },
      },
    ],
    lat_location: Number,
    lng_lacation: Number,
  },

  {
    timestamps: true,
    collection: "addInfocharging",
  }
);

module.exports = AddInfocharg = mongoose.model(
  "AddInfoModel",
  AddinfomodelsSchema
);
