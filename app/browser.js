var document = require('global/document');
var cuid = require('cuid');
var hg = require('mercury');
var h = require('mercury').h;

var track = 'https://ia902707.us.archive.org/17/items/NodeUp81/NodeUp81.mp3';

function App() {
  return hg.state({
    tracks: hg.array([
      hg.struct({
        id: cuid(),
        playing: hg.value(false),
        mp3: hg.value(track)
      })
    ]),
    channels: {
      addTrack: addTrack
    }
  });
}

function addTrack(state, data) {
  state.tracks.push(
    hg.struct({
      id: cuid(),
      playing: hg.value(false),
      mp3: hg.value(data.url)
    })
  );
}

App.render = function render(state) {
  return h('div', [
    h('audio', {
      'id': 'player',
      'controls': true
    }, [
      h('source', {
        'src': state.tracks[0].mp3
      })
    ]),
    h('ol', state.tracks.map(function listTrack(track) {
      return h('li', {
        'id': track.cuid
      }, track.mp3);
    })),
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
