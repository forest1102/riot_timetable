import buble from 'buble' // bubleを読み込む -- (1)

export default {
  // スクリプトのタイプとして`buble`を指定 -- (2)
  type: 'buble',
  parsers: {
    // パーサの種類として`buble`を追加 -- (3)
    js: { buble: js => buble.transform(js) }
  }
}