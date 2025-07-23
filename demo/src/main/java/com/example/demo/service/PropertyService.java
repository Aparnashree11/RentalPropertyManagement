package com.example.demo.service;

import com.example.demo.model.Property;
import com.example.demo.model.User;
import com.example.demo.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getProperties(String owner) {
        return propertyRepository.findByOwner(owner);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property saveProperty(Property property) {
        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public void updateProperty(Long id, Property updatedProperty) {
        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));

        existingProperty.setName(updatedProperty.getName());
        existingProperty.setAddress(updatedProperty.getAddress());
        existingProperty.setRent(updatedProperty.getRent());
        existingProperty.setDescription(updatedProperty.getDescription());

        propertyRepository.save(existingProperty);
    }
}
