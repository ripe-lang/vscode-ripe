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
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true,
      inside: {
        escape: {
          pattern: /\\[nt\\"']|\\0|{{|}}/,
          alias: 'constant',
        },
        interpolation: {
          pattern: /{[^{}]*}/,
          inside: {
            punctuation: /^{|}$/,
          },
        },
      },
    },
    'char-literal': {
      pattern: /'(?:[^'\\]|\\.)'/,
      greedy: true,
      alias: 'string',
    },
    'function-definition': {
      pattern: /\b(func)\s+[A-Za-z_]\w*/,
      inside: {
        keyword: /^func/,
        function: /\w+$/,
      },
    },
    'import-path': {
      pattern: /\b(import|module)\s+[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*/,
      inside: {
        keyword: /^\w+/,
        'class-name': /[\w.]+$/,
      },
    },
    keyword: /\b(?:var|func|struct|enum|type|const|module|import|if|else|while|for|in|break|continue|return|loop|match|extern|pub|sizeof|bitcast)\b/,
    builtin: {
      pattern: /\b(?:i8|i16|i32|i64|u8|u16|u32|u64|isize|usize|f32|f64|bool|cstr|char|str|int|float|never|opaque)\b/,
      alias: 'class-name',
    },
    boolean: /\b(?:true|false)\b/,
    constant: /\b(?:null|undefined)\b/,
    function: /\b[A-Za-z_]\w*(?=\s*\()/,
    number: /\b(?:0[xX][\da-fA-F][\da-fA-F_]*|0[bB][01][01_]*|0[oO][0-7][0-7_]*|\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:i8|i16|i32|i64|isize|u8|u16|u32|u64|usize|f32|f64)?\b/,
    operator:
      /\.\.=|\.\.\.|\.\.|<<=?|>>=?|&&|\|\||[+\-*/%&|^]=?|[=!<>]=|[=!~<>]/,
    punctuation: /[{}[\]();,.:]/,
  };
}
