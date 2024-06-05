// plagiarized from: https://github.com/ccbikai/ip-api

// func to get flags
var EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;
function getFlag(countryCode) {
  const regex = new RegExp("^[A-Z]{2}$").test(countryCode);
  if (!countryCode || !regex)
    return void 0;
  return String.fromCodePoint(
    ...countryCode.split("").map((char) => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
  );
}

// Function to convert filteredJson to CSV
function jsonToCsv(json) {
    let csv = '';
    // Extract keys from the first object in the array
    const keys = Object.keys(json[0]);
    // Write header row
    csv += keys.join(',') + '\n';
    // Write data rows
    json.forEach(item => {
        const values = keys.map(key => item[key]);
        csv += values.join(',') + '\n';
    });
    return csv;
}

// Function to convert filteredJson to XML
function jsonToXml(json) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<data>\n';
    for (const [key, value] of Object.entries(json)) {
      xml += `<${key}>${value}</${key}>\n`;
    }
    xml += '</data>';
    return xml;
}

//func to convert json to yaml
function jsonToYaml(json) {
  const yamlLines = [];
  function parseObject(obj, indentLevel = 0) {
    const indent = ' '.repeat(indentLevel * 2);
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) {
        continue; // Skip undefined values
      }
      if (typeof value === 'object' && value !== null) {
        yamlLines.push(`${indent}${key}:`);
        parseObject(value, indentLevel + 1);
      } else if (typeof value === 'string') {
        yamlLines.push(`${indent}${key}: "${value}"`);
      } else {
        yamlLines.push(`${indent}${key}: ${value}`);
      }
    }
  }
  parseObject(json);
  return yamlLines.join('\n');
}

// Allow Access from any origin
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*"
};

// Main Func
var src_default = {
  fetch(request) {
    const ip = request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");
    //Other Headers can also be extracted from response
    //cf-connecting-ip --> IP of Request Initiator
    //cf-ipcountry --> Country Code of Request Initiator
    //x-real-ip --> Real IP of Request Initiator
    //accept-language --> Locale of Request Initiator (example: en-US,en;q=0.5)
    const { pathname } = new URL(request.url);
    console.log(ip, pathname);

   //Generate JSON 
    const json = {
      "ip": ip,
      "city": request.cf.city,
      "country": request.cf.country,
      "flag": getFlag(request.cf.country),
      "region": request.cf.region,
      "latitude": request.cf.latitude,
      "longitude": request.cf.longitude,
      "org": request.cf.asOrganization,
      "timezone": request.cf.timezone,
      "user-agent": userAgent,
      "readme": "https://github.com/Azathothas/ip.ajam.dev"
    };

   // Filter out undefined values
    const filteredJson = Object.fromEntries(
      Object.entries(json).filter(([key, value]) => value !== undefined)
    );

   //Print csv if request is to ip.ajam.dev/csv
   if (pathname === "/csv") {
        const csvStr = jsonToCsv([filteredJson]);
        console.log(csvStr);
        return new Response(csvStr, {
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "text/csv",
        }
    });

   //Print json if request is to ip.ajam.dev/json
    } else if (pathname === "/json") {
        console.log(filteredJson);
        const jsonResponse = JSON.stringify(filteredJson);
        return new Response(jsonResponse, {
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            }
        });

   //Print text if request is to ip.ajam.dev/text        
    } else if (pathname === "/text") {
        const textEntries = Object.entries(filteredJson)
        .map(([key, value]) => `${key}=${value}`);
        const textStr = textEntries.join('\n');
        console.log(textStr);
        return new Response(textStr, {
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "text/plain;charset=utf-8",
          }
        });

   //Print xml if request is to ip.ajam.dev/xml
    } else if (pathname === "/xml") { // Add XML handling
        const xmlStr = jsonToXml(filteredJson);
        console.log(xmlStr);
        return new Response(xmlStr, {
          headers: {
            ...CORS_HEADERS,
            "Content-Type": "application/xml",
          }
        });

   //Print yaml if request is to ip.ajam.dev/yaml  
    } else if (pathname === "/yaml") {
      const yamlStr = jsonToYaml({
        ip,
        ...json
      });
      console.log(yamlStr);
      return new Response(yamlStr, {
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/yaml",
        }
      });
    }

   //Print plain text IP Only if request is to ip.ajam.dev without any path suffix
    return new Response(ip, {
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "text/plain",
        "x-client-ip": ip
      }
    });
  }
};

export {
  src_default as default
};
//# sourceMappingURL=index.js.map