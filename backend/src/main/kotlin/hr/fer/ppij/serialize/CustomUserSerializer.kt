package hr.fer.ppij.serialize

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.ser.std.StdSerializer
import hr.fer.ppij.model.User

class CustomUserSerializer(t: Class<User>) : StdSerializer<User>(t) {
    override fun serialize(user: User?, generator: JsonGenerator, provider: SerializerProvider?) {
        generator.writeStartObject()
        generator.writeNumberField("id", user?.id!!)
        generator.writeEndObject()
    }
}