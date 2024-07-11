/* This class is a utility for Managing Events, allowing you to register(on), unregister(off), and trigger(trigger) events. */

export default class EventEmitter {
  constructor() {
    // Store all event-names & their corresponding callbacks
    this.callbacks = {};
    this.callbacks.base = {};
  }

  on(_names, callback) {
    //===== Check Name-event Errors
    if (typeof _names === 'undefined' || _names === '') {
      console.warn(
        'EventEmitter.on: Event names are missing or empty. Please provide valid event names.'
      );
      return false;
    }

    //===== Check callback-fn Errors
    if (typeof callback === 'undefined') {
      console.warn(
        'EventEmitter.on: Callback function is missing. Please provide a valid callback function.'
      );
      return false;
    }

    //==== Resolve names then Register each name
    const names = this.resolveNames(_names);
    names.forEach((_name) => {
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object))
        this.callbacks[name.namespace] = {};

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  off(_names) {
    if (typeof _names === 'undefined' || _names === '') {
      console.warn(
        'EventEmitter.off: Event names are missing or empty. Please provide valid event names to unregister.'
      );
      return false;
    }

    const names = this.resolveNames(_names);
    names.forEach((_name) => {
      const name = this.resolveName(_name);

      //=== Remove namespace
      if (name.namespace !== 'base' && name.value === '') {
        delete this.callbacks[name.namespace];
      }

      //=== Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === 'base') {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        }

        //=== Specified namespace
        else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace];
        }
      }
    });

    return this;
  }

  trigger(_name, _args) {
    if (typeof _name === 'undefined' || _name === '') {
      console.warn(
        'EventEmitter.trigger: Event name is missing or empty. Please provide a valid event name to trigger.'
      );
      return false;
    }

    let finalResult = null;
    let result = null;

    //=== Default args
    const args = !(_args instanceof Array) ? [] : _args;

    let name = this.resolveNames(_name);
    name = this.resolveName(name[0]);

    //=== Default namespace
    if (name.namespace === 'base') {
      //=== Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(this, args);

            if (typeof finalResult === 'undefined') {
              finalResult = result;
            }
          });
        }
      }
    }

    //=== Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === '') {
        console.warn(
          'EventEmitter.trigger: Event name is missing a specific value. Please provide a valid event name to trigger.'
        );
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(this, args);

        if (typeof finalResult === 'undefined') finalResult = result;
      });
    }

    return finalResult;
  }

  resolveNames(_names) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, ''); 
    // Removing Invalid Characters

    names = names.replace(/[,/]+/g, ' ');
    // Replacing Commas and Slashes with Spaces:

    names = names.split(' '); 
    // Splitting the String into an Array:

    return names;
  }

  resolveName(name) {
    const newName = {};
    const parts = name.split('.');

    newName.original = name; // Assign the Original Name
    newName.value = parts[0]; // Assign the Main Value
    newName.namespace = 'base'; // Assign the Default Namespace

    //== Check for a Specified Namespace
    if (parts.length > 1 && parts[1] !== '') {
      newName.namespace = parts[1];
    }

    return newName;
  }
}

/**************** Usage *******************
 - it can be used for any of your classes that need to trigger events

  . an animation of the model has finished
  . an object has been clicked on 
  . the player is going out of the level
  . an enemy died
  . all resources are loaded
 */

/**************** on() *******************
 - The on function is used to register event listeners for specified events. 
 
 - It ensures that both the event names and the callback function are valid before proceeding. 
 
 - It then processes the event names, assigns them to their respective namespaces, and stores the callback functions in the appropriate arrays within the callbacks object. */

/**************** off() *******************
 - The purpose of the off(_names) method is to unregister or remove event listeners from an EventEmitter object. 
 
 - This method is designed to handle various scenarios for removing callbacks associated with events, ensuring that the event emitter no longer calls those callbacks when the corresponding events are emitted.
 
 - Overall, this method is essential for managing the lifecycle of event listeners in an event-driven system, ensuring that unwanted callbacks can be efficiently removed and the system remains clean and performant. */

/**************** trigger() *******************
 - The purpose of the trigger(_name, _args) method is to invoke or trigger event listeners (callbacks) associated with a specified event name in an EventEmitter object. 
 
 - This method allows for executing all the callbacks tied to an event, passing along any arguments provided, and optionally returning a result.
 
 - This method is essential for an event-driven system, enabling events to be triggered and their associated callbacks to be executed, passing along any necessary data. */

/************* resolveNames() *************
 - The resolveNames function is designed to take a string of event names that may contain various delimiters (spaces, commas, slashes) and clean it up by removing any unwanted characters, normalizing the delimiters to spaces, and then splitting the cleaned string into an array of individual event names.

- This ensures that the event names are in a consistent and usable format for further processing.

      let result = resolveNames("event1, event2/event3, event4 / event5");

into this: 
      ["event1", "event2", "event3", "event4", "event5"]  */

/************* resolveName() *************
 - The resolveName function is designed to take an event name that may include a namespace (separated by a period) and break it down into its component parts. It returns an object containing:

      - The original name.
      - The main value of the name.
      - The namespace, which defaults to 'base' if no specific namespace is provided.

      let result = resolveName("event1.namespace1");
into this: 
      {
        original: "event1.namespace1",
        value: "event1",
        namespace: "namespace1"
      }


      let result = resolveName("event1");
into this: 
      {
        original: "event1",
        value: "event1",
        namespace: "base" // Default namespace
      }  */