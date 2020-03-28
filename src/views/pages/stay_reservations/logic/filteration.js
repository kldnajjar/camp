let stringBuffer = "";

const filteration = {
  id: {
    filter: {
      name: "document_number",
      param: ""
    }
  },
  price: {
    filter: {
      name: "price",
      param: ""
    }
  },
  reservation_type: {
    filter: {
      name: "reservation_type",
      param: ""
    }
  },
  tent_id: {
    filter: {
      name: "tent",
      param: ""
    }
  },
  stay_type_id: {
    filter: {
      name: "stay_type",
      param: ""
    }
  },
  contact_name: {
    filter: {
      name: "contact_name",
      param: ""
    }
  },
  contact_number: {
    filter: {
      name: "contact_number",
      param: ""
    }
  },
  contact_email: {
    filter: {
      name: "contact_email",
      param: ""
    }
  },
  guests_count: {
    filter: {
      name: "guests_count",
      param: ""
    }
  },
  reserved_from: {
    filter: {
      name: "reserved_from",
      param: ""
    }
  },
  reserved_to: {
    filter: {
      name: "reserved_to",
      param: ""
    }
  },

  status: {
    filter: {
      name: "status",
      param: ""
    }
  },
  company_id: {
    filter: {
      name: "company_id",
      param: ""
    }
  },
  notes: {
    filter: {
      name: "notes",
      param: ""
    }
  },
  reservation_number: {
    filter: {
      name: "reservation_number",
      param: ""
    }
  },
  created_at: {
    filter: {
      name: "created_at",
      param: ""
    }
  }
};

export async function exposeFilteration(data) {
  let filter;
  stringBuffer = "";
  Object.keys(data).map(item => {
    if (!filteration[item]) return null;

    filter = filteration[item].filter || "";
    switch (item) {
      case "path":
        console.log("not valid state");
        break;
      default:
        mapNormalData(data, item, filter);
    }

    return stringBuffer;
  });

  return stringBuffer.substring(0, stringBuffer.length - 1);
}

function mapNormalData(data, item, filter) {
  if (data[item] && data[item].length)
    stringBuffer += `${filter.name}${filter.param}=${data[item]}&`;
}

export default {
  exposeFilteration
};
