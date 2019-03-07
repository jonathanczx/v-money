import {format, setCursor, event} from './utils'
import assign from './assign'
import defaults from './options'

export default function (el, binding) {
  if (!binding.value) return
  var opt = assign(defaults, binding.value)

  // v-money used on a component that's not a input
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input')
    if (els.length !== 1) {
      // throw new Error("v-money requires 1 input, found " + els.length)
    } else {
      el = els[0]
    }
  }

  el.oninput = function () {
    var positionFromEnd = el.value.length - el.selectionStart // before formatting cursor left
    el.value = format(el.value, opt)
    positionFromEnd = Math.max(positionFromEnd, opt.suffix.length)
    var positionFromStart = el.value.length - positionFromEnd
    positionFromStart = Math.max(positionFromStart, opt.prefix.length + 1)
    setCursor(el, positionFromStart)
    el.dispatchEvent(event('change')) // v-model.lazy
  }

  el.onfocus = function () {
    var positionFromStart = el.value.length - (opt.suffix.length + opt.precision + 1)
    setCursor(el, positionFromStart)
  }

  el.oninput()
  el.dispatchEvent(event('input')) // force format after initialization
}
