---

layout: default

---

## Day 1 (20/7/2025)

- Did Learn to Code From Zero (GDScript)
- Declaring functions: func name():
- Normally uses _ for functions
- You cannot use a number at the start of an identifier
- Rotate uses radians
- rotate(), jump(), show(), hide()
- y-axis POINTS DOWN
- Sub variables - use .
    - e.g scale.x, scale.y
- Setting variables - var health = 100
- _process(delta) function -> does calculations or a continuous process
    - the time each frame is processed is different -> uses parameter delta which represents a time difference (time passed since previous frame)
    - delta helps make the game more consistent for different computers (who have different processing speeds) by making motion time-dependent rather than frame-dependent by multiplying it
        - FOR EXAMPLE:
            - player.x += 5  # Move 5 pixels EVERY FRAME
            - Thus, for faster computers, they move faster
            - but for player.x += 5 * delta_time  # Move 5 pixels PER SECOND
            - It is time consistent

- func _process(delta): rotate (4 * delta)
- MEANS that it rotates 4 radians a second
- You can only use a variable inside a function if you define it in the function
- *= exists
- 2D vectors -> Vector2, does not need to use sub variables e.g. position = Vector2(50, 0)
- for loops do NOT run infinitely, so it's much less likely for bugs compared to while loops -> recommended to favour for loops over while loops
- for loops: for i in range(2), for i in [0, 1, 2]
- setting arrays: var numbers = [1,2,3]
- lerp() function ?
- array.append(thing) / array.pop_front(thing) / array.pop_back(thing)
- You can use negative indices in arrays, where -1 is the last item, -2 is the second last item, etc.
- dictionaries have keys that point to a value (almost like associative arrays), all keys have to be unique You set it like a variable
- var inventory = { "healing heart" : 3, "gems": 5,}
- Type hints lets the computer know what type of value you want for variables
- var variable_name: Type = value
- e.g. var cell_size: Vector2 = Vector2(50.0, 50.0)
- You can detect whether a key is pressed using Input.is_action_pressed(), which returns true if it's pressed or false if it isn't.
- $ is shorthand for get_node(). So in the code above, $AnimatedSprite2D.play() is the same as get_node("AnimatedSprite2D").play().

In GDScript, $ returns the node at the relative path from the current node, or returns null if the node is not found. Since AnimatedSprite2D is a child of the current node, we can use $AnimatedSprite2D

21/7/2025
Finished my first game (at 2 am lol), dodge the creeps from godot documentation