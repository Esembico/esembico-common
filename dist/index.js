function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function tokenize(code, _ref) {
  var specialCharacters = _ref.specialCharacters,
      stringCharacters = _ref.stringCharacters,
      commentCharacter = _ref.commentCharacter;
  var tokens = [];
  var currentToken = {};

  for (var index = 0; index < code.length; index++) {
    var ch = code[index];

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
          value: ""
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
        value: ch
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
          value: ch
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
          value: ch
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
          value: ch
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
          value: ch
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
        value: ch
      };
    }
  }

  tokens.push(currentToken);
  tokens.shift();
  return tokens;
}

function highlight(code, language) {
  var _language = language(code, tokenize),
      tokens = _language.tokens,
      keywords = _language.keywords;

  var newCode = "";

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.type === "text" && keywords.includes(token.value.toLowerCase())) {
      newCode += "<span class=\"keyword\">" + token.value + "</span>";
      continue;
    }

    if (token.type === "number") {
      newCode += "<span class=\"number\">" + token.value + "</span>";
      continue;
    }

    if (token.type === "comment") {
      newCode += "<span class=\"comment\">" + token.value + "</span>";
      continue;
    }

    if (token.type === "string") {
      newCode += "<span class=\"string\">" + token.value + "</span>";
      continue;
    }

    newCode += token.value;
  }

  newCode = newCode.trim().split("\n").map(function (line) {
    return "<code class=\"line\">" + line.trimEnd() + "</code>";
  }).join("\n");
  return newCode;
}

function CodeHighligher(_ref) {
  var getLanguageFunction = _ref.getLanguageFunction,
      children = _ref.children,
      language = _ref.language;

  var _useState = React.useState(children),
      newCode = _useState[0],
      setNewCode = _useState[1];

  React.useEffect(function () {
    getLanguageFunction(language, function (fn) {
      setNewCode(highlight(children, fn));
    });
  }, [children, language]);
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React__default.createElement("pre", {
    dangerouslySetInnerHTML: {
      __html: newCode
    }
  }));
}

function python(code, tokenize) {
  var specialCharacters = ["(", ")", "+", "=", "-", ",", "."];
  var keywords = ["and", "del", "from", "not", "while", "as", "elif", "global", "or", "with", "assert", "else", "if", "pass", "yield", "break", "except", "import", "print", "class", "exec", "in", "raise", "continue", "finally", "is", "return", "def", "for", "lambda", "try"];
  var tokens = tokenize(code, {
    specialCharacters: specialCharacters,
    stringCharacters: ["'", '"'],
    commentCharacter: "#"
  });
  return {
    tokens: tokens,
    keywords: keywords
  };
}

function vba(code, tokenize) {
  var specialCharacters = ["(", ")", "+", "=", "-", ",", "."];
  var keywords = ["#if", "#else", "#else", "#end", "#const", "alias", "and", "as", "base", "boolean", "byte", "byref", "byval", "call", "case", "cbool", "cbyte", "ccur", "cdate", "cdbl", "cint", "clng", "clnglng", "clngptr", "compare", "const", "csng", "cstr", "currency", "cvar", "database", "date", "declare", "defbool", "defbyte", "defdate", "defdec", "defdouble", "defint", "deflng", "deflnglng", "deflngptr", "defobj", "defsng", "defstr", "dim", "do", "double", "each", "else", "elseif", "empty", "end", "enum", "erase", "error", "event", "exit", "explicit", "false", "for", "friend", "function", "get", "global", "goto", "if", "iif", "implements", "integer", "is", "let", "lbound", "lib", "like", "long", "longlong", "loop", "lset", "me", "mod", "new", "next", "not", "nothing", "null", "object", "on", "option", "optional", "or", "paramarray", "preserve", "private", "property", "public", "raiseevent", "redim", "resume", "return", "rset", "select", "set", "single", "static", "step", "stop", "string", "sub", "text", "then", "to", "true", "type", "typeof", "ubound", "until", "variant", "wend", "while", "with", "withevents", "in"];
  var tokens = tokenize(code, {
    specialCharacters: specialCharacters,
    stringCharacters: ['"'],
    commentCharacter: "'"
  });
  return {
    tokens: tokens,
    keywords: keywords
  };
}

exports.CodeHighlighter = CodeHighligher;
exports.languagePython = python;
exports.languageVBA = vba;
//# sourceMappingURL=index.js.map
