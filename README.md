# ruby-js

The point of this module is to ease the pain of transitioning from ruby to javascript. My goal with ruby-js is to implement the essential ruby standard library methods right on their native javascript prototype counterparts. What makes a method essential? If there's that constant inconvenience and a little cringe when it's not available as ya program in javascript. 

Some example code:

    var records = [ { name: 'AJ', age: 19 }, { name: 'Eli', age: 17 } ];
    records.collect('name').map('reverse')
    //= [ "JA", "ilE" ]

    var evens = [], odds = [];
    [1, 2, 3, 4, 5, 6].each_slice(2, function(left, right) {
	    evens.push(right); odds.push(left);
    });
    [evens, odds]
    //= [ [ 2, 4, 6 ], [ 1, 3, 5 ] ]

    function below(min) {
      return function(x) { return x < min };
    }
    [25, 4, 8, 23, 19].reject( below(20) )
    //= [ 25, 23 ]

Docs will be a long time coming... however a checklist:

Object
- class

Enumerator:
- ::new
- each
- next
- next_values
- peek
- peek_values
- with_index & each\_with\_index
- with_object & each\_with\_object
- to_a

Array:
- ::new
- at
- clear
- compact
- concat
- each _(can't break to return nil)_

*new* in Array:
- append (think of it as concat!)

Enumerable:
- all
- any
- count
- cycle
- detect & find
- each_cons
- each_slice
- each_with\_index
- each_with\_object
- flat_map & collect\_concat
- find_index
- first
- select & find_all
- group_by
- include & member
- inject _(not reduce)_
- map & collect
- none
- one
- partition
- reject
- reverse_each
- take

String
- reverse
- capitalize
- downcase
- upcase
- scan
- gsub

