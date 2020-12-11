const request = require('supertest');
app = require('../src/rutas.js')

describe("GET /", function() {
  it("comprobar que funciona", function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200,done);
  });
});

//HU2 -> Añadir una traducción nueva
describe("POST /vocabulario/:palabra/:significado", function() {
  //Añadimos la palabra y el significado correctamente
  it('añadir una palabra y su significado', function(done){
    request(app)
      .post('/vocabulario/INFORMÁTICA./INFORMATIQUE.CONJUNTO DE CONOCIMIENTOS TÉCNICOS QUE SE OCUPAN DEL TRATAMIENTO AUTOMÁTICO DE LA INFORMACIÓN POR MEDIO DE COMPUTADORAS.')
      .expect('Content-Type', /json/)
      .expect(201,done);
  });
  //Devolvemos un error ya que la palabra que se quiere añadir ya está registrada
  it("mostrar error 400 si añadimos una palabra que ya existe", function(done){
    request(app)
      .post('/vocabulario/INFORMÁTICA./INFORMATIQUE.SIGNIFICADO DISTINTO AL ANTERIOR PERO CORRESPONDIENTE A LA MISMA PALABRA.')
      .expect('Content-Type', /json/)
      .expect(400,done);
  });
});

//HU1 -> Consultar todo el listado de vocabulario
describe("GET /vocabulario", function() {
  //Mostramos todo el listado de vocabulario
  it('mostrar todo el listado', function(done){
    request(app)
      .get('/vocabulario')
      .expect('Content-Type', /json/)
      .expect(200,done);
  });
});

//HU3 -> Buscar una palabra concreta en el listado
describe("GET /vocabulario/:palabra", function(){
  //Mostramos una palabra concreta junto con su significado / traducción 
  it('mostrar palabra concreta', function(done){
    request(app) 
      .get('/vocabulario/INFORMÁTICA.')
      .expect('Content-Type', /json/)
      .expect(200,done);
  });
  //Devolvemos un error ya que buscamos una palabra que no existe 
  it('mostrar error 404 si la palabra que buscamos no existe', function(done){
    request(app)
      .get('/vocabulario/LIBRO.')
      .expect('Content-Type', /json/)
      .expect(404,done)
  });
});

//HU4 -> Modificar el significado de una palabra 
describe("PUT /vocabulario/:palabra/:significadoNuevo", function(){
  //Modificamos el significado de una palabra existente 
  it('cambiar significado', function(done){
    request(app)
      .put('/vocabulario/INFORMÁTICA./CAMBIO EL SIGNIFICADO.')
      .expect('Content-Type', /json/)
      .expect(200,done)
  });
  //Devolvemos un error ya que la palabra no existe
  it('mostrar error 404 si la palabra no existe', function(done){
    request(app)
      .put('/vocabulario/LIBRO./CAMBIO EL SIGNFICADO DE PALABRA INEXISTENTE.')
      .expect('Content-Type', /json/)
      .expect(404,done)
  });
});

//HU5 -> Mostrar traducciones que empiezan por una determinada letra 
describe("GET /vocabulario/filtrar/:letra", function(){
  //Mostramos las traducciones que empiezan por dicha letra 
  it('filtrar por letra', function(done){
    request(app)
      .get('/vocabulario/filtrar/I')
      .expect('Content-Type', /json/)
      .expect(200,done)
  });
  //Devolvemos un error si no hay ninguna palabra que comience por dicha letra 
  it('mostrar error 404 ya que no encuentra ninguna palabra', function(done){
    request(app)
      .get('/vocabulario/filtrar/M')
      .expect('Content-Type', /json/)
      .expect(404,done)
  });
});

//HU6 -> Añadir expresión popular al listado de expresiones
describe("POST /expresiones/:expresion/:explicacion", function(){
  //Añadimos la expresión popular correctamente 
  it('añadir expresión popular', function(done){
    request(app) 
      .post("/expresiones/C'EST SIMPLE COMME BONJOUR./SE USA CUANDO ALGO ES TAN FÁCIL COMO DECIR HOLA, ES DECIR, CUANDO ALGO ES FACILÍSIMO.")
      .expect('Content-Type', /json/)
      .expect(201,done)
  });
  //Devolvemos un error si la expresión insertada ya existe 
  it('mostrar error 400 ya que la expresión insertada ya existe', function(done){
    request(app)
      .post("/expresiones/C'EST SIMPLE COMME BONJOUR./LA EXPLICACIÓN ES DISTINTA PERO LA EXPRESIÓN ES LA MISMA.")
      .expect('Content-Type', /json/)
      .expect(400,done)
  });
});
