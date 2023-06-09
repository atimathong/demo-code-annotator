function matchVarToKeywords(regData, varData) {
  // varData = {
  //     variable: variableName,
  //     line: position.line,
  //     character: position.character,
  //   };
  let addRegData = {};
  try {
    for (let reg of regData) {
      reg["keywords"].forEach((kw) => {
        let lowVari = varData["variable"].toLowerCase();
        if (kw === lowVari || kw.includes(lowVari) || lowVari.includes(kw)) {
          console.log(kw, lowVari);
          Object.assign(addRegData, reg);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }

  if (Object.keys(addRegData).length === 0) {
    return null;
  }
  return addRegData;

  //return [] if find no match keyword
  //return regulation data if find matched keyword
}

function countOccurrence(regData, allVars) {
  //allVars = [....]
  let outputContent = {};
  let finalOutputContent = {};

  for (let item of allVars) {
    if (Object.keys(outputContent).includes(item)) {
      outputContent[item] += 1;
    } else {
      Object.assign(outputContent, { [item]: 1 });
    }
  }

  for (let item of Object.keys(outputContent)) {
    let lowVari = item.toLowerCase();
    for (let reg of regData) {
      reg["keywords"].forEach((kw) => {
        if (kw === lowVari || kw.includes(lowVari) || lowVari.includes(kw)) {
          console.log(kw, lowVari);
          if (!finalOutputContent.hasOwnProperty(item)) {
            Object.assign(finalOutputContent, { [item]: outputContent[item] });
          }
        }
      });
    }
  }

  return finalOutputContent;
}
module.exports = { matchVarToKeywords, countOccurrence };
