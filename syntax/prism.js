const NEST_DEPTH = 4;

function blockCommentPattern() {
  const plain = '(?:[^*/]|\\*(?!\\/)|\\/(?!\\*))';
  let pattern = '\\/\\*' + plain + '*\\*\\/';
  for (let level = 0; level < NEST_DEPTH; level++) {
    pattern = '\\/\\*(?:' + plain + '|' + pattern + ')*\\*\\/';
  }
  return new RegExp(pattern);
}

export default function prismIncludeLanguages(Prism) {
  Prism.languages.ripe = {
    comment: [
      {
        pattern: blockCommentPattern(),
        greedy: true,
      },
      {
        pattern: /\/\/.*/,
        greedy: true,
      },
    ],
    'function-definition': [
      {
        pattern: /\b[A-Za-z_]\w*\s*::\s*fn\b/,
        inside: {
          function: /^\w+/,
          operator: /::/,
          keyword: /fn$/,
        },
      },
      {
        pattern: /((?:^|[\n;{])[ \t]*)[A-Za-z_]\w*(?=\s*(?::=|::)\s*(?:extern\s*"[^"]*"\s*)?fn\b)/,
        lookbehind: true,
        alias: 'function',
      },
      {
        pattern: /((?:^|[\n;{])[ \t]*)[A-Za-z_]\w*(?=\s*:(?![:=])[^:=;]*(?::|=)\s*(?:fn|extern)\b)/,
        lookbehind: true,
        alias: 'function',
      },
    ],
    'type-definition': [
      {
        pattern: /\b[A-Za-z_]\w*\s*::\s*(?:struct|enum)\b/,
        inside: {
          'class-name': /^\w+/,
          operator: /::/,
          keyword: /\w+$/,
        },
      },
      {
        pattern: /((?:^|[\n;{])[ \t]*)[A-Za-z_]\w*(?=\s*:\s*(?:type\s*:(?![:=])|_\s*:\s*(?:struct|enum)\b))/,
        lookbehind: true,
        alias: 'class-name',
      },
    ],
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true,
      inside: {
        escape: {
          pattern: /\\[nrt0\\"]/,
          alias: 'constant',
        },
      },
    },
    'char-literal': {
      pattern: /'(?:[^'\\]|\\.)'/,
      greedy: true,
      alias: 'string',
    },
    label: {
      pattern: /@[A-Za-z_]\w*/,
      alias: 'symbol',
    },
    keyword: /\b(?:fn|struct|enum|if|else|while|for|break|continue|return|loop|match|extern|sizeof|cast)\b/,
    builtin: {
      pattern: /\b(?:i8|i16|i32|i64|u8|u16|u32|u64|isize|usize|f32|f64|bool|char|cstr|str|never|ptr|type)\b/,
      alias: 'class-name',
    },
    boolean: /\b(?:true|false)\b/,
    constant: /\b(?:null)\b/,
    function: /\b[A-Za-z_]\w*(?=\s*\()/,
    number: /\b(?:0[xX][\da-fA-F][\da-fA-F_]*|0[bB][01][01_]*|0[oO][0-7][0-7_]*|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:i8|i16|i32|i64|isize|u8|u16|u32|u64|usize|f32|f64)?\b/,
    operator:
      /::|:=|->|=>|\.\.=|\.\.|&&=|\|\|=|<<=?|>>=?|&&|\|\||[+\-*/%&|^]=?|[=!<>]=|[=!~<>]/,
    punctuation: /[{}[\]();,.:]/,
  };
}
