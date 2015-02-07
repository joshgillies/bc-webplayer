var document = require('global/document');
var hg = require('mercury');
var h = require('mercury').h;

var track = 'https://ia902707.us.archive.org/17/items/NodeUp81/NodeUp81.mp3';

function App() {
  return hg.state({
    track: hg.struct({
      mp3: hg.value(track)
    }),
    channels: {
      addTrack: addTrack
    }
  });
}

function addTrack(state, data) {
  state.track.mp3.set(data.url);
}

App.render = function render(state) {
  return h('div', [
    h('audio', {
      'controls': true
    }, [
      h('source', {
        'src': state.track.mp3
      })
    ]),
    h('form', {
      'ev-event': hg.sendSubmit(state.channels.addTrack)
    }, [
      h('input', {
        'name': 'url',
        'value': ''
      }),
      h('button', 'Add track')
    ])
  ]);
};

hg.app(document.body, App(), App.render);
