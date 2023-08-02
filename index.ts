import {
  FromKeyParam,
  ifVar,
  layer,
  LayerKeyParam,
  map,
  ModifierParam,
  rule,
  simlayer,
  ToKeyCode,
  ToKeyParam,
  withCondition,
  withMapper,
  withModifier,
  writeToProfile,
} from 'karabinerts'
import { engram, engram_left, engram_right } from './engram.ts'

const qhr: FromKeyParam[] = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
const ehr: ToKeyCode[] = ['c', 'i', 'e', 'a', 'h', 't', 's', 'n']
const mods = ['‹⌃', '‹⌥', '‹⌘', '‹⇧', '›⇧', '›⌘', '›⌥', '›⌃']

// toggle modifier bits and sort to correct order ‹⌘⌥⌃⇧
const mod = (n: number) => n.toString(2)
  .padStart(4, '0')
  .split('')
  .map((v, i) => +v ? mods[i].split('')[1] : '')
  .sort((a, b) => {
    const [u, v] = [a,b].map(v => v === '⌃' ? 1 : v === '⌥' ? 2 : v === '⌘' ? 3 : 0)
    return v - u
  })
  .join('') as ModifierParam

writeToProfile('karabiner.ts', [
  // rule('hrm').manipulators([
  //   withMapper(qhr)((k, i) =>
  //     map(k)
  //       .to('vk_none')
  //       .toIfAlone(ehr[i], undefined, { halt: true })
  //       .toDelayedAction({ key_code: 'vk_none' }, { key_code: ehr[i] })
  //       .toIfHeldDown({
  //         set_variable: { name: mods[i], value: 1 },
  //         repeat: false,
  //       })
  //       .toAfterKeyUp({ set_variable: { name: mods[i], value: 0 } })
  //   ),
  // ]),

  // rule('engram').manipulators([
  //   ...[...Array(16).keys()].map((i) => {
  //     const t = i.toString(2).padStart(4, '0').split('').map((v) => +v)
  //     const l_mod = mod(i)
  //     return withCondition(...[...Array(4).keys()].map(c => ifVar(mods[c], t[c]))
  //     )([
  //       withMapper(engram_right)((k) => map(k.from).to(k.to, l_mod)),
  //     ])
  //   }),
  // ]),
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
        map(k).to(v as ToKeyParam, '‹⌘')
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
  'basic.to_if_alone_timeout_milliseconds': 199,
  'basic.to_delayed_action_delay_milliseconds': 200,
  'basic.to_if_held_down_threshold_milliseconds': 200,
})
