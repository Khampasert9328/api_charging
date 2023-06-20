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
        },
        brand: {
          type: String,
        },
        generation: {
          type: String,
        },
        model: {
          type: String,
        },
        type_charge: [
          {
            type_charging: {
              type: String,
            },
          },
        ],
      },    
    ],

    pictureplace: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    village: {
      type: String,
    },
    nameplace: {
      type: String,
    },
    facilities: [
      {
        facilitie: {
          type: String,
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
