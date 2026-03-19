function getNestedValue(obj, path) {
  return path.split('.').reduce(function(current, key) {
    return current != null ? current[key] : undefined;
  }, obj);
}

exports.findValueInJson = function(json, paths) {

  const res = paths.reduce((acc, cur) => {
    const jpBits = cur.split(',').filter((bit) => bit !== "" && bit !== undefined)
    const valuesFromJson = jpBits.map((bit) => {
      const sanitizedBit = bit.trim()
      const value = getNestedValue(json, sanitizedBit);
      if(value){
        if (typeof value === "string") {
          return value
        } else if(Array.isArray(value)){
          return value.join(" ");
        }
      }
    }).filter((bit) => bit !== "" && bit !== null && bit !== "null" && bit !== undefined)

    if(valuesFromJson.length > 0) {
      const ccc = valuesFromJson.join(" ")
      if(ccc !== "") acc.push(ccc)
    }

    return acc
  }, [])

  return res.length > 0 ? res.join(" ") : undefined
}
