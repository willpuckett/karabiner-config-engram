import { FromKeyParam, ModifierParam, ToKeyParam } from 'karabinerts'

interface IEngram {
  from: FromKeyParam
  fromMod?: ModifierParam
  to: ToKeyParam
  toMod?: ModifierParam
}

const thumbs: IEngram[] = [
  { from: '⇥', to: '⇥' },
  { from: '␣', to: '␣' },
  { from: '<⌘', to: '⌫' },
  { from: '>⌘', to: '⏎' },
]

const left: IEngram[] = [
  // Number Row
  { from: '`', to: '[' },
  { from: 1, to: '1' },
  { from: 2, to: '2' },
  { from: 3, to: '3' },
  { from: 4, to: '4' },
  { from: 5, to: '5' },
  // Center Column/Punctuation
  { from: 't', to: '\'' },
  { from: 'g', to: ',' },
  { from: 'b', to: '-' },
    { from: 'y', to: ';' },
  { from: 'h', to: '.' },
  { from: 'n', to: '/' },
  // { from: '‹⇧', to: '[' },

  // Letters
  { from: 'q', to: 'b' },
  { from: 'w', to: 'y' },
  { from: 'e', to: 'o' },
  { from: 'r', to: 'u' },
  { from: 'a', to: 'c' },
  { from: 's', to: 'i' },
  { from: 'd', to: 'e' },
  { from: 'f', to: 'a' },
  { from: 'z', to: 'g' },
  { from: 'x', to: 'x' },
  { from: 'c', to: 'j' },
  { from: 'v', to: 'k' },
]

const right: IEngram[] = [
  // Number Row
  { from: 6, to: '6' },
  { from: 7, to: '7' },
  { from: 8, to: '8' },
  { from: 9, to: '9' },
  { from: 0, to: '0' },
  { from: '-', to: ']' },
  { from: '=', to: '\\' },
  // Center Column/Punctuation
    { from: 't', to: '\'' },
  { from: 'g', to: ',' },
  { from: 'b', to: '-' },
  { from: 'y', to: ';' },
  { from: 'h', to: '.' },
  { from: 'n', to: '/' },
  { from: ']', to: '=' },
  { from: '\\', to: '`' },
  // { from: '>⇧', to: ']' },
  // Letters
  { from: 'u', to: 'l' },
  { from: 'i', to: 'd' },
  { from: 'o', to: 'w' },
  { from: 'p', to: 'v' },
  { from: '[', to: 'z' },
  { from: 'j', to: 'h' },
  { from: 'k', to: 't' },
  { from: 'l', to: 's' },
  { from: ';', to: 'n' },
  { from: '\'', to: 'q' },
  { from: 'm', to: 'r' },
  { from: ',', to: 'm' },
  { from: '.', to: 'f' },
  { from: '/', to: 'p' },
  // Arrows
  { from: '↑', to: '↑' },
  { from: '↓', to: '↓' },
  { from: '←', to: '←' },
  { from: '→', to: '→' },
]

export const engram = [
  ...left.filter((l) => !right.some((r) => r.from === l.from)),
  ...right,
  ...thumbs,
]

export const engram_left = [...left, ...thumbs]
export const engram_right = [...right, ...thumbs]
