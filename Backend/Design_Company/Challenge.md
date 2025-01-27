

During my technical interview with -REDACTED-, they presented me with a challenge that resembled this:

```javascript
class Layer {
  constructor(id, properties = {}){
    this.id = id
    this.properties = properties
  }
}

class Doc {
  constructor(){
	  //
    }
  }

  getLayer(layerID){
	  // create this
  }

  apply(layerID, property, value){
	// create this
  }

  undo(){
	// create this
  }
}

let doc = new Doc([
  new Layer("a", {color: "red"}),
  new Layer("b", {shape: "triangle"})
])

console.log("1", doc.getLayer("a"))
doc.apply("a", "color", "blue")
console.log("2", doc.getLayer("a"))
doc.undo()
console.log("3", doc.getLayer("a"))
```

I didn't have the idea to copy the exercise during the interview, so this is the best I could recreate it from memory.

In the interview, I implemented much of the next code example. However, my initial idea was to implement history by storing an array called "history" that recorded every piece of state that was applied. This ended up being overkill, as the last item in state is the only thing that's needed. My interviewer pointed this out to me.

In hindsight, there was no real issue with storing the entire history, even if I only needed information about the last action.

But where my initial implementation fell short was that capturing the last *action* doesn't really guaranty that you have the information to undo that action.

This might be very intuitive to you, but it wasn't immediately intuitive to me. Here's an example:

If I start with a working computer and I execute these actions:
1. Publish blog article
2. Smash computer (with sledge hammer)

Then I could go back to action #1, publish blog, but that won't get me my computer back. I could also try to enact action #2 I guess, but that wouldn't really do my any good either.

What I need is not the action, but the state *before* the last action was executed:

1. action: Publish blog article, state before action: working computer
2. action: smash computer, state before action: working computer
3. action: cry, state before action: smashed computer

The state at the time before an action is executed is the important thing here. So let's look at how this is implemented. I've gone back to recreate my implementation. Here it is:

```javascript
class Layer {
  constructor(id, properties = {}){
    this.id = id
    this.properties = properties
  }
}

class Doc {
  constructor(layers){
    this.lastAction = {}
    this.layers = {}
    for (const layer of layers){
      this.lastAction = {id: layer.id, properties: layer.properties}
      this.layers[layer.id] = layer
    }
  }

  getLayer(layerID){
    return this.layers[layerID]
  }

  apply(layerID, property, value){
    let layer = this.getLayer(layerID)
    this.lastAction = {
      id: layerID,
      properties: {
        // My mistake was writing this:
        // [property]: value
        [property]: this.getLayer(layerID).properties[property]
      }
    }
    layer.properties[property] = value
  }

  undo(){
    let layer = this.getLayer(this.lastAction.id)
    layer.properties = this.lastAction.properties
  }
}

let doc = new Doc([
  new Layer("a", {color: "red"}),
  new Layer("b", {shape: "triangle"})
])

console.log("1", doc.getLayer("a"))
doc.apply("a", "color", "blue")
console.log("2", doc.getLayer("a"))
doc.undo()
console.log("3", doc.getLayer("a"))

/*
Output:
1 Layer { id: 'a', properties: { color: 'red' } }
2 Layer { id: 'a', properties: { color: 'blue' } }
3 Layer { id: 'a', properties: { color: 'red' } }
*/

```

After thinking about my implementation after the interview, what I realized is that I was *so close*. I just wasn't saving the value of the property being changed in the apply function correctly. I've highlighted this mistake as a comment in my code:

```javascript
	// My mistake was writing this:
	// [property]: value
	[property]: this.getLayer(layerID).properties[property]
```

I'm relieved that I was on the right track, but I wish I'd been more confident. It turns out that with three minutes to go, I attempted to return to my `history` paradigm, and as a hail mary, I added a property to doc called `lastLastAction`, sort of returning to this idea that I wasn't going far enough back in time. But my issue was that I was saving the *action*, not the state at the time before that action was applied.

In a calm environment later, when I read my code, it really stood out to me as more of a typo than anything - why set the last action to the same value as the new `apply`? That is just redundant.

However, I believe it was less a typo of carelessness, and more of a failure to grasp that the state and the action were really a different type of data.

I know that I was in the wrong paradigm because before I realized this, I had an entirely separate solution that was still more in "history" land, where I though, I can the last action for any unique `id/property` pair in an object (hash table).

```javascript
{
	'a-color': 'blue',
	'b-shape': 'square'
}
```

The last value for each layer-property could be saved in this way. I believe this would *work*, but it's not necessary. This allows actions to be saved *as* state. But since the only state that's relevant is the `id/property` combination of our last action, we can just continue rewriting our last action with the state that occurred before it was executed, *rather* than ever bothering to record a history of the action itself.