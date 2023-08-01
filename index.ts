import {
  FromKeyParam,
  layer,
  LayerKeyParam,
  map,
  ModifierParam,
  rule,
  simlayer,
  ToKeyParam,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabinerts'
import { engram, engram_left, engram_right } from './engram.ts'

const qhr: FromKeyParam[] = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']

writeToProfile('karabiner.ts', [
  ...(qhr.map((key, i) => {
    const mod = ['<⌃', '<⌥', '<⌘', '<⇧', '>⇧', '>⌘', '>⌥', '>⌃'][i]
    return simlayer(key as LayerKeyParam, mod)
      .manipulators([
        withMapper(i < 4 ? engram_right : engram_left)((k) =>
          map(k.from).to(k.to, mod as ModifierParam)
        ),
      ])
  })),

  layer('⇪', 'nav').manipulators([
    withModifier('optionalAny')([
      withMapper({
        'u': '↖︎',
        'i': '⇟',
        'o': '⇞',
        'p': '↘︎',
        'j': '←',
        'k': '↓',
        'l': '↑',
        ';': '→',
      })((k, v) => map(k).to(v as ToKeyParam)),
      withMapper({ 'm': 'z', ',': 'x', '.': 'c', '/': 'v' })((k, v) =>
        map(k).to(v as ToKeyParam, '<⌘')
      ),
      map('n').to('z', '<⌘⇧'),
    ]),
  ]),

  // rule('short pinkies').manipulators([
  //   withModifier('optionalAny')([
  //     map('<⌘').toIfAlone('⌫').to('<⌘'),
  //     map('>⌘').toIfAlone('⏎').to('>⌘'),
  //   ])
  // ]),

  rule('engram').manipulators([
    withModifier('optionalAny')([
      withMapper(engram)((k) => map(k.from).to(k.to)),
    ]),
  ]),
], {
  'simlayer.threshold_milliseconds': 500,
  // 'basic.to_delayed_action_delay_milliseconds': 151,
  // 'basic.to_if_alone_timeout_milliseconds': 150,
  // 'basic.to_if_held_down_threshold_milliseconds': 151,
})



