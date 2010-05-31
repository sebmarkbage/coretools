"CoreTools"
===========
This is an experimental rewrite of the Core of MooTools Core for future versions maybe.

The purpose is to explore which parts are most useful even for the most basic applications.

The intention is to minimize the footprint in terms of file size, global namespaces and
architectural impact while providing extensibility points instead. The purpose is to
decouple the dependency graph to minimize the impact of common practice.

The basic Core dependencies only provide a few minimal enumeration helpers in the Core
namespace, ES5-compatible APIs and a light Class implementation. The Core.ES5 folder
can be excluded when you're already in an ES5-compatible environment.

DOM access is provided through wrapper APIs.

A secondary goal is to provide ES5 strict mode support with secure DOM APIs that can
be shared with external scripts running on the same page.

This API should be considered for experimental evaluation purposes only.

(ES5 == ECMAScript 5th Edition)