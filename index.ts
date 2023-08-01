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
const mods = ['<⌃', '<⌥', '<⌘', '<⇧', '>⇧', '>⌘', '>⌥', '>⌃']

writeToProfile('karabiner.ts', [
  // Use spread to create a simlayer for each home row mod.Currently only handles 1 mod at a time.
  ...(qhr.map((key, i) => simlayer(key as LayerKeyParam, mods[i])
      .manipulators([
        withMapper(i < 4 ? engram_right : engram_left)((k) =>
          map(k.from).to(k.to, mods[i] as ModifierParam)
        ),
      ])
  )),
// A layer for nav and cut/copy/paste/undo/redo
  layer('⇪', '⇪').manipulators([
    withModifier('optionalAny')([
      // Nav
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
      // cut/copy/paste/undo
      withMapper({ 'm': 'z', ',': 'x', '.': 'c', '/': 'v' })((k, v) =>
        map(k).to(v as ToKeyParam, '<⌘')
      ),
      // redo
      map('n').to('z', '<⌘⇧'),
    ]),
  ]),

  // Engram base layer
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



