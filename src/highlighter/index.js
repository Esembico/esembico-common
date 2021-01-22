function tokenize(
  code,
  { specialCharacters, stringCharacters, commentCharacter }
) {
  const tokens = [];
  let currentToken = {};

  for (let index = 0; index < code.length; index++) {
    const ch = code[index];
    if (currentToken.type === "comment" && !/\r|\n/.test(ch)) {
      currentToken.value += ch;
      continue;
    }
    if (currentToken.type === "string") {
      currentToken.value += ch;
      if (stringCharacters.includes(ch)) {
        tokens.push(currentToken);
        currentToken = {
          type: "null",
          value: "",
        };
      }
      continue;
    }
    if (ch === "." && currentToken.type === "number") {
      currentToken.value += ch;
      continue;
    }
    if (specialCharacters.includes(ch)) {
      tokens.push(currentToken);
      currentToken = {
        type: "special_character",
        value: ch,
      };
      continue;
    }
    if (/\s/.test(ch)) {
      if (currentToken.type === "whitespace") {
        currentToken.value += ch;
      } else {
        tokens.push(currentToken);
        currentToken = {
          type: "whitespace",
          value: ch,
        };
      }
      continue;
    }
    if (ch >= "0" && ch <= "9") {
      if (currentToken.type === "number") {
        currentToken.value += ch;
      } else {
        tokens.push(currentToken);
        currentToken = {
          type: "number",
          value: ch,
        };
      }
      continue;
    }
    if (stringCharacters.includes(ch)) {
      if (currentToken.type === "string") {
        currentToken.value += ch;
      } else {
        tokens.push(currentToken);
        currentToken = {
          type: "string",
          value: ch,
        };
      }
      continue;
    }
    if (ch === commentCharacter) {
      if (currentToken.type === "comment") {
        currentToken.value += ch;
      } else {
        tokens.push(currentToken);
        currentToken = {
          type: "comment",
          value: ch,
        };
      }
      continue;
    }
    if (currentToken.type === "text") {
      currentToken.value += ch;
    } else {
      tokens.push(currentToken);
      currentToken = {
        type: "text",
        value: ch,
      };
    }
  }
  tokens.push(currentToken);
  tokens.shift();
  return tokens;
}

export function highlight(code, language) {
  const { tokens, keywords } = language(code, tokenize);

  let newCode = "";

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === "text" && keywords.includes(token.value.toLowerCase())) {
      newCode += `<span class="keyword">${token.value}</span>`;
      continue;
    }
    if (token.type === "number") {
      newCode += `<span class="number">${token.value}</span>`;
      continue;
    }
    if (token.type === "comment") {
      newCode += `<span class="comment">${token.value}</span>`;
      continue;
    }
    if (token.type === "string") {
      newCode += `<span class="string">${token.value}</span>`;
      continue;
    }
    newCode += token.value;
  }
  newCode = newCode
    .trim()
    .split("\n")
    .map(function (line) {
      return `<code class="line">${line.trimEnd()}</code>`;
    })
    .join("\n");
  //codeBlock.innerHTML = newCode;
  return newCode;
}
