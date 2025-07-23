package com.example.demo.service;

import com.example.demo.model.LeaseAgreement;
import com.example.demo.model.Property;
import com.example.demo.model.User;
import com.example.demo.repository.LeaseAgreementRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeaseAgreementService {

    @Autowired
    private LeaseAgreementRepository leaseAgreementRepository;
    @Autowired
    private UserRepository userRepo;

    public List<LeaseAgreement> getAllLeaseAgreements(String name) {
        User user = userRepo.findByUsername(name);
        String role = user.getRole();
        if (role.equals("ROLE_OWNER")) {
            return leaseAgreementRepository.findByOwner(name);
        }
        return leaseAgreementRepository.findByTenant(name);
    }

    public LeaseAgreement saveLeaseAgreement(LeaseAgreement leaseAgreement) {
        Property property = leaseAgreement.getProperty();
        leaseAgreement.setOwner(property.getOwner());
        leaseAgreement.setStatus("PENDING");
        return leaseAgreementRepository.save(leaseAgreement);
    }

    public void deleteLeaseAgreement(Long id) {
        leaseAgreementRepository.deleteById(id);
    }

    public LeaseAgreement updateLeaseAgreement(long id, LeaseAgreement leaseAgreement) {
        LeaseAgreement existingLease = leaseAgreementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lease not found with id: " + id));
        existingLease.setStatus(leaseAgreement.getStatus());
        existingLease.setLeaseStartDate(leaseAgreement.getLeaseStartDate());
        existingLease.setLeaseEndDate(leaseAgreement.getLeaseEndDate());
        return leaseAgreementRepository.save(existingLease);
    }
}
